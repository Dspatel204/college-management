import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createPaymentOrder, verifyPayment } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { CreditCard, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// Razorpay is loaded via script tag in __root.tsx
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FeeRecord {
  id: string;
  type: string;
  amount: number;
  paid: number;
  status: string;
  studentId: string;
}

interface PaymentModalProps {
  open: boolean;
  fee: FeeRecord | null;
  onClose: () => void;
  onSuccess: (updatedFee: any) => void;
}

export function PaymentModal({ open, fee, onClose, onSuccess }: PaymentModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<"confirm" | "loading" | "success" | "error">("confirm");
  const [errorMsg, setErrorMsg] = useState("");
  const [receiptNo, setReceiptNo] = useState("");

  const amountDue = fee ? parseFloat(String(fee.amount)) - parseFloat(String(fee.paid || 0)) : 0;

  const handlePay = async () => {
    if (!fee) return;
    setStep("loading");
    setErrorMsg("");

    try {
      // 1. Create Razorpay order
      const order = await createPaymentOrder(fee.id);

      // 2. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "CollegeHub",
        description: `${fee.type.charAt(0).toUpperCase() + fee.type.slice(1)} Fee Payment`,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#6366f1" },
        handler: async (response: any) => {
          // 3. Verify payment on backend
          try {
            const result = await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              feeId: fee.id,
            });
            setReceiptNo(result.receiptNo);
            setStep("success");
            onSuccess(result.fee);
          } catch (err: any) {
            setErrorMsg(err.message || "Payment verification failed");
            setStep("error");
          }
        },
        modal: {
          ondismiss: () => {
            // User closed modal without paying
            setStep("confirm");
          },
        },
      });

      rzp.open();
    } catch (err: any) {
      setErrorMsg(err.message || "Could not initiate payment");
      setStep("error");
    }
  };

  const handleClose = () => {
    setStep("confirm");
    setErrorMsg("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Fee Payment
          </DialogTitle>
          <DialogDescription>
            Secure payment powered by Razorpay
          </DialogDescription>
        </DialogHeader>

        {step === "confirm" && fee && (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee Type</span>
                <span className="font-medium capitalize">{fee.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-medium">₹{parseFloat(String(fee.amount)).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Already Paid</span>
                <span className="font-medium text-green-600">₹{parseFloat(String(fee.paid || 0)).toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Amount Due</span>
                <span className="text-primary text-lg">₹{amountDue.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handlePay}>
                Pay ₹{amountDue.toLocaleString("en-IN")}
              </Button>
            </div>
          </div>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Opening payment gateway...</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-9 w-9 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Receipt No: <span className="font-mono font-medium">{receiptNo}</span>
              </p>
            </div>
            <Button className="w-full" onClick={handleClose}>Done</Button>
          </div>
        )}

        {step === "error" && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-9 w-9 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Payment Failed</h3>
              <p className="text-sm text-muted-foreground mt-1">{errorMsg}</p>
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={handleClose}>Cancel</Button>
              <Button className="flex-1" onClick={() => setStep("confirm")}>Try Again</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

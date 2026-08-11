const { getMongoConnected, setMongoConnected } = require('./state');
const { Student, Faculty, Timetable, Attendance, Fee, ExamSchedule, ExamResult, Course } = require('./models');
const { readJsonFile, writeJsonFile } = require('./data-store');
const { students, faculty, timetable, attendance, fees, examSchedules, examResults, courses, SUBJECTS, DEPARTMENTS } = require('./models/collegeData');

async function seedMongo() {
  const count = await Student.countDocuments();
  if (count > 0) {
    console.log('MongoDB already has data. Skipping seed.');
    return;
  }

  console.log('Seeding MongoDB...');

  await Student.insertMany(students);
  await Faculty.insertMany(faculty);
  await Timetable.insertMany(timetable);
  await Attendance.insertMany(attendance);
  await Fee.insertMany(fees);
  await ExamSchedule.insertMany(examSchedules);
  await ExamResult.insertMany(examResults);
  await Course.insertMany(courses);

  console.log('MongoDB seeded successfully.');
}

function seedJson() {
  const studentStore = readJsonFile('students.json', []);
  if (studentStore.length > 0) {
    console.log('JSON store already has data. Skipping seed.');
    return;
  }

  console.log('Seeding JSON files...');

  writeJsonFile('students.json', students);
  writeJsonFile('faculty.json', faculty);
  writeJsonFile('timetable.json', timetable);
  writeJsonFile('attendance.json', attendance);
  writeJsonFile('fees.json', fees);
  writeJsonFile('examSchedules.json', examSchedules);
  writeJsonFile('examResults.json', examResults);
  writeJsonFile('courses.json', courses);

  console.log('JSON files seeded successfully.');
}

async function main() {
  if (getMongoConnected()) {
    await seedMongo();
  } else {
    seedJson();
  }
}

main()
  .then(() => {
    console.log('Seeding complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });

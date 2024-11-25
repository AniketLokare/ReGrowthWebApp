import { faker } from '@faker-js/faker';
import fs from 'fs';

const dir = './mocks/data';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


const createPatients = () => {
  return Array.from({ length: 100 }, () => ({ 
    id: faker.number.int({ min: 1, max: 9999 }),
    patientId: faker.number.int({ min: 1, max: 9999 }),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    patientAge: faker.number.int({ min: 15, max: 80 }),
    patientGender: faker.person.sex(),
    patientRegDate: faker.date.recent(),
    patientMobile1: faker.phone.number(),
    patientMobile2: faker.phone.number(),
    patientMedicalHistory: faker.lorem.sentence(),
    cashierName: faker.person.fullName(),
    patientReports: faker.lorem.sentence(),
    timestamp: faker.date.recent(),
  }));
};

const createProcedures = () => {
  return Array.from({ length: 100 }, () => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    procedureId: faker.number.int({ min: 1, max: 9999 }),
    procedureCashierName: faker.person.fullName(),
    cashPayment: faker.number.int({ min: 1, max: 9999 }),
    clinicName: faker.company.name(),
    discount: faker.number.int({ min: 10, max: 30 }),
    finalAmount: faker.number.int({ min: 1, max: 9999 }),
    procedureDate: faker.date.recent(),
    onlinePayment: faker.number.int({ min: 1, max: 9999 }),
    procedureDetails: faker.lorem.sentence(),
    procedureType: faker.lorem.sentence(),
    procedureTime: faker.date.timestamp,
    patientReports: faker.lorem.sentence(),
    totalAmount: faker.number.int({ min: 1, max: 9999 }),
    patientName: faker.person.fullName(),
  }));
};

const createUsers = () => {
  return Array.from({ length: 10 }, () => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    userId: faker.number.int({ min: 1, max: 9999 }),
    username: faker.internet.username(),
    password: faker.internet.password(),
    role: faker.animal.type(),
    mobileNumber: faker.phone.number(),
  }));
};

const createMedicines = () => {
  return Array.from({ length: 100 }, () => ({
    medicineId: faker.number.int({ min: 1, max: 9999 }),
    medicineName: faker.person.fullName(),
    medicinePack: faker.number.int({ min: 1, max: 9999 }),
    medicineType: faker.lorem.sentence(),
    medicinePrice: faker.number.int({ min: 1, max: 9999 }),
  }));
};

const procedures = createProcedures();
const patients = createPatients();
const users = createUsers();
const medicines = createMedicines();

const jsonData = JSON.stringify({ patients, procedures, users, medicines }, null, 2);

if (fs.existsSync(`${dir}/db.json`)) {
  console.log('db.json already exists!');
} else {
  fs.writeFile(`${dir}/db.json`, jsonData, 'utf8', (err) => {
    console.log(err || 'db.json generated successfully!');
  });
}

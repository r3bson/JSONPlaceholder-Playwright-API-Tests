import { faker } from '@faker-js/faker/locale/en';
import { UserPayload } from '../models/user.api.model';

export function createRandomUser(): UserPayload {
  const userData: UserPayload = {
    id: faker.number.int({ min: 1, max: 999 }),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    address: {
      street: faker.location.street(),
      suite: `Suite ${faker.number.int({ min: 100, max: 999 })}`,
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      geo: {
        lat: faker.location.latitude().toString(),
        lng: faker.location.longitude().toString(),
      },
    },
    phone: faker.phone.number({ style: 'national' }),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.buzzPhrase(),
    },
  };
  return userData;
}

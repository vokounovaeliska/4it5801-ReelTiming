import { MySql2Database } from 'drizzle-orm/mysql2';
import { project_user } from '../src/db/schema';

async function seedProjectUser(
  db: MySql2Database<typeof import('../src/db/schema')>,
) {
  if ((await db.select().from(project_user)).length === 0) {
    console.log('No projects found, inserting sample project_user');
    const projectUsers = [
      {
        id: '2613db5e-057c-4032-976f-735bc1cd5622',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: '4b95fa2a-b110-431e-a141-929c94870c1f',
        department_id: 'f9931b15-6d2a-4d91-b328-79509d0da246', //TODO seedy takhle nebudou fungovat
        position: 'Chief',
        rate_id: '85cf4dfa-7768-49ec-b56e-38ab3ae7b252',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-04T18:56:08'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-05T12:34:12'),
        is_active: true,
        role: 'CREW',
        invitation: '455f8c6f-e1ee-4ad0-87f5-9b94d97308db',
        phone_number: '+420705404520',
        name: 'Marie',
        surname: 'Vdolek',
        email: 'marie.vdolkova@film.com',
      },
      {
        id: '455f8c6f-e1db-4ad0-87f5-9b94d97308db',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: null,
        department_id: '53964a96-17f1-4c96-a69d-cec10f2b01b6',
        position: '1st Assistant Director',
        rate_id: '77e960f2-8f64-4c0e-94e7-84e7e013fe16',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-04T18:38:53'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-04T18:54:55'),
        is_active: false,
        role: 'CREW',
        invitation: null,
        phone_number: '+420755000999',
        name: 'Tomáš',
        surname: 'Hezký',
        email: 'tomas@film.cz',
      },
      {
        id: '50e0a51b-7212-40ff-87f3-354a7b1b2338',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: null,
        department_id: '8d8cca48-7f4d-422b-892d-692902a733a5',
        position: 'Stylist',
        rate_id: '9bb93221-e8fe-42ca-bafd-1e12dfb98520',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-04T18:51:26'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-04T18:51:26'),
        is_active: false,
        role: 'CREW',
        invitation: null,
        phone_number: '+420704909303',
        name: 'Anna-Sofie',
        surname: 'McLauren',
        email: 'McLauren@film.com',
      },
      {
        id: '51def4b3-1d71-4a5e-b9d0-321f543af67c',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: null,
        department_id: '890818b3-e1e7-4759-b107-fdbc2532334d',
        position: 'Security',
        rate_id: '041f571f-c0da-41be-8246-69ce5183153a',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-04T18:52:34'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-04T18:54:40'),
        is_active: false,
        role: 'CREW',
        invitation: null,
        phone_number: '+420909429034',
        name: 'Michal',
        surname: 'Jirků',
        email: 'm.jirku@film.com',
      },
      {
        id: '800c4e76-a473-49e5-a18a-52d2cc7f12a2',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: '75a41493-c0b3-45ba-86bd-970459ee9b99',
        department_id: '53964a96-17f1-4c96-a69d-cec10f2b01b6',
        position: 'Produkce',
        rate_id: '5ec942bb-4a24-44e6-bcba-56bc5cbb5bce',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-05T14:21:59'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-05T14:22:41'),
        is_active: true,
        role: 'ADMIN',
        invitation:
          '54b09ee030fc0f6513f1bf7e37190cb80646c5c42175bdbf98d93b70ca06fedc',
        phone_number: '+420707540384',
        name: 'Jan',
        surname: 'Doleček',
        email: 'produkce@film.com',
      },
      {
        id: '8b1ef1aa-10bc-4649-ac97-ab2017b4b5ba',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: null,
        department_id: '5008d9f1-ca78-4b9b-a513-29516c49ede6',
        position: 'Gaffer',
        rate_id: '6edb3f21-bc29-476b-abed-b9f0d1e97191',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-04T18:48:55'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-04T18:48:55'),
        is_active: false,
        role: 'CREW',
        invitation: null,
        phone_number: '+420777999444',
        name: 'Erik',
        surname: 'Novák',
        email: 'erik.novak@film.com',
      },
      {
        id: 'd6ce4f0b-82f3-449b-a04d-0f5396510f2c',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: null,
        department_id: '53964a96-17f1-4c96-a69d-cec10f2b01b6',
        position: '2nd Assistant Director',
        rate_id: '707bf50e-a0f3-4c6d-8df1-af51b9a8e84d',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-05T12:12:01'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-05T12:14:08'),
        is_active: false,
        role: 'CREW',
        invitation: null,
        phone_number: '+420606009090',
        name: 'Marek',
        surname: 'Krásný',
        email: 'marek.krasny@film.com',
      },
      {
        id: 'f2274b45-4499-4bc3-8e36-d60bb66dcf78',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: null,
        department_id: '890818b3-e1e7-4759-b107-fdbc2532334d',
        position: 'Camera Operator',
        rate_id: '7bc4a1cf-c1a6-4ef1-87c7-47079bbf3e77',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-05T12:34:12'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-05T12:34:12'),
        is_active: false,
        role: 'CREW',
        invitation: null,
        phone_number: '+420777123456',
        name: 'David',
        surname: 'Svoboda',
        email: 'david.svoboda@film.com',
      },
      {
        id: 'f6ef9292-bbe7-40d3-b929-2e9ff6d7cb68',
        project_id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        user_id: null,
        department_id: '8d8cca48-7f4d-422b-892d-692902a733a5',
        position: 'Production Assistant',
        rate_id: 'b21c7c71-bc82-43dc-bd53-f0a1bdfd0e15',
        number_of_people: null,
        is_team_leader: false,
        create_date: new Date('2024-11-05T14:10:30'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-05T14:10:30'),
        is_active: false,
        role: 'CREW',
        invitation: null,
        phone_number: '+420606444555',
        name: 'Klara',
        surname: 'Novotná',
        email: 'klara.novotna@film.com',
      },
    ];

    // Insert project users
    await db.insert(project_user).values(projectUsers);
  } else {
    console.log(
      'Departments or rates are missing in the database. Please seed those tables first.',
    );
  }
}

export default seedProjectUser;

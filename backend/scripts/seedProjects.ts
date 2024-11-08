import { MySql2Database } from 'drizzle-orm/mysql2';

import { project } from '../src/db/schema';

async function seedProjects(
  db: MySql2Database<typeof import('../src/db/schema')>,
) {
  console.log('Seeding projects...');

  if ((await db.select().from(project)).length === 0) {
    console.log('No projects found, inserting sample users');

    await db.insert(project).values([
      {
        id: 'c0733427-2c24-4cf8-b663-a01529288153',
        name: 'Reklama Budvar',
        production_company: 'Neon Dream Pictures',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2024-10-21 20:00:00'),
        create_date: new Date('2024-10-19 05:58:07'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 05:58:07'),
        is_active: true,
        description:
          'V reklamě sledujeme cestu piva od zlatavých klasů obilí po sklenici na vašem stole. Kamera nás provází malebnou českou krajinou, kde místní sládci s úsměvem a hrdostí pečlivě vybírají ty nejlepší suroviny.',
      },
      {
        id: 'c34a76ec-f945-45d9-9b0a-71e570f27295',
        name: 'Samsung Galaxy S24',
        production_company: 'Spotlight Creations',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2024-10-21 20:00:00'),
        create_date: new Date('2024-10-19 05:11:37'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 05:11:37'),
        is_active: true,
        description:
          'Uživatelé ve městě i v přírodě ukazují různé funkce nového mobilu. Detailní záběry designu a technologických inovací jsou kombinovány s ukázkami aplikací a praktických scénářů každodenního použití.',
      },
      {
        id: '413c68f9-2168-4abd-893f-7993466b57c1',
        name: 'Kameňák 6',
        production_company: 'Spotlight Creations',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2024-10-21 20:00:00'),
        create_date: new Date('2024-10-19 05:28:44'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 05:28:44'),
        is_active: true,
        description:
          'V Kameňákově se starosta Pepa snaží udržet město v pořádku, ale chaos propuká, když mu náhodně spadne na stůl kouzelný klobouk. S jeho absurdními nápady se obyvatelé ocitají v komických situacích, které dokazují, že vládnout je umění plné humoru!',
      },
      {
        name: 'Kreativní Reklama',
        production_company: 'Reklamní Studio CZ',
        start_date: new Date('2024-11-01'),
        end_date: new Date('2025-01-31'),
        create_date: new Date('2024-10-18 19:00:10'),
        create_user_id: 'user-id-1',
        last_update_user_id: 'user-id-1',
        last_update_date: new Date('2024-10-18 19:00:10'),
        is_active: true,
        description: 'An innovative advertising campaign for a local brand.',
      },
      {
        id: '05797cb1-845b-470c-921a-1678d9148eda',
        name: 'Škoda Elroq',
        production_company: 'BestFilm',
        start_date: new Date('2024-11-26 22:00:00'),
        end_date: new Date('2024-12-27 22:00:00'),
        create_date: new Date('2024-10-19 11:52:17'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 11:52:17'),
        is_active: true,
        description:
          'Natáčení dynamické reklamy na automobil, kde kaskadéři provádějí náročné kousky, a k tomu je potřeba technický tým, osvětlovači, pyrotechnici a koordinátoři kaskadérských scén.',
      },
      {
        id: 'df789351-fbba-4005-9be3-cb77f9fa059e',
        name: 'Vánoční pohádka pro ČT',
        production_company: 'Epic Horizon Films',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2025-02-27 22:00:00'),
        create_date: new Date('2024-10-19 05:12:47'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 05:12:47'),
        is_active: true,
        description:
          'Nová vánoční pohádka vypráví příběh malé dívky, která se o Štědrém večeru vydává na dobrodružnou cestu, aby našla ztracenou hvězdu, jež má o Vánocích přinést do vesnice světlo a naději.',
      },
      {
        id: 'd37720ff-8d79-40ba-8e44-02590e023f08',
        name: 'Wellness Oáza',
        production_company: 'Neon Dream Pictures',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2024-10-21 20:00:00'),
        create_date: new Date('2024-10-19 05:58:46'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 05:58:46'),
        is_active: true,
        description:
          'Relaxační záběry plné přírody, masáží a klidu. Kamera nás provází krásnými scenériemi bazénů, saun a wellness procedur, které mají diváka nalákat na dokonalou dovolenou plnou odpočinku a péče o tělo i mysl.',
      },
      {
        id: '8220cb8d-c957-4127-8e91-12b02ec0857d',
        name: 'Autoservis Boura',
        production_company: 'Biograf Pictures',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2024-10-21 20:00:00'),
        create_date: new Date('2024-10-19 05:20:47'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 05:20:47'),
        is_active: true,
        description:
          'Sledujeme auto projíždějící krajinou, které se náhle porouchá. Autoservis rychle přichází na pomoc. Záběry mechaniků při práci jsou kombinovány s ukázkami moderního vybavení a spokojeného zákazníka.',
      },
      {
        id: '8c5388e4-964c-4734-93c5-929dabb90d93',
        name: 'Kavárna za rohem',
        production_company: 'Daybreak Cinematics',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2024-10-21 20:00:00'),
        create_date: new Date('2024-10-19 05:22:37'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 05:22:37'),
        is_active: true,
        description:
          'Sledujeme příběh ranního zákazníka, který díky šálku voňavé kávy začne svůj den s úsměvem. Kamera zachycuje detailní záběry pražení a přípravy kávy, doplněné atmosférou útulné kavárny.',
      },
      {
        id: '4dd6ec6b-8c05-410c-ae17-06942641716d',
        name: 'Škola vaření',
        production_company: 'Cinematic Pulse Productions',
        start_date: new Date('2024-10-18 20:00:00'),
        end_date: new Date('2024-10-21 20:00:00'),
        create_date: new Date('2024-10-19 06:35:24'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-10-19 06:35:24'),
        is_active: true,
        description:
          'Sledujeme začátečníka v kuchařském kurzu, jak se zlepšuje a připravuje své první jídlo. Záběry lekcí, instruktorů a radostného vaření jsou doprovázeny pozvánkou k přihlášení na kurz.',
      },
    ]);

    console.log('Sample projects inserted');
  } else {
    console.log('Projects already exist, skipping project seed');
  }
}
export default seedProjects;

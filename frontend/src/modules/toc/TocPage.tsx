import { Box, Text } from '@chakra-ui/react';

export function ToCPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      //   height="100vh"
      bg="#F7FAFC"
      p={4}
    >
      <Box
        width={{ base: '90%', sm: '400px', md: '600px', xl: '800px' }} // Responsive width
        p={4}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
      >
        <Text>
          <h1>
            Podmínky užívání aplikace pro reportování pracovní doby filmových
            štábů
          </h1>
          Účinnost od: 12.10.2024
          <h2>1. Přijetí podmínek</h2>
          Používáním, přístupem k aplikaci nebo jakýmkoli zapojením do procesu
          reportování pracovní doby prostřednictvím aplikace pro filmové štáby
          (dále jen "Aplikace") souhlasíte, že bezpodmínečně přijímáte
          následující podmínky užívání (dále jen "Smlouva"), a to bez ohledu na
          jejich pochopení, přečtení, nebo přehlednost jednotlivých ustanovení.
          Pokračováním v používání Aplikace potvrzujete svůj neodvolatelný
          souhlas s aktuální verzí těchto podmínek, které mohou být kdykoli
          upraveny, změněny či revidovány na základě výhradního uvážení
          provozovatele Aplikace.
          <h2>2. Reportování dat a jejich přesnost</h2>
          Uživatelé (dále jen "Vy" nebo "Uživatel") berou na vědomí, že všechny
          záznamy o pracovní době, hlášení, zadávání dat nebo jakékoli jiné
          informace vložené do Aplikace jsou výhradní odpovědností uživatele.
          Aplikace nijak neověřuje, nepotvrzuje, negarantuje ani nezaručuje
          přesnost, včasnost nebo úplnost zadávaných dat. Jakékoli chyby,
          opomenutí či nesprávné reportování pracovní doby jsou výhradní
          odpovědností Uživatele, a Aplikace nepřebírá žádnou odpovědnost za
          řešení nesrovnalostí či sporů vzniklých v této souvislosti.
          <h2>Vyloučení odpovědnosti vůči třetím stranám</h2>
          Aplikace, její vlastníci, provozovatelé ani přidružené osoby nenesou
          odpovědnost za jakékoli přímé, nepřímé, náhodné, následné nebo
          speciální škody včetně, ale nikoli výhradně, sporů vyplývajících ze
          smluvních závazků, pracovněprávních vztahů, právních kroků nebo
          finančních důsledků, které vzniknou v důsledku používání Aplikace nebo
          v souvislosti s ní. Aplikace nijak neručí za jakékoli problémy, škody
          či komplikace způsobené třetími stranami, a to včetně, ale nikoli
          výhradně, externích poskytovatelů služeb, zaměstnavatelů, objednatelů
          nebo jiných subjektů mimo přímou kontrolu Aplikace.
          <h2>4. Změny podmínek</h2>
          Provozovatel Aplikace si vyhrazuje právo kdykoli bez předchozího
          upozornění změnit, upravit nebo doplnit tyto Podmínky užívání dle
          svého uvážení. Uživatel je povinen pravidelně kontrolovat aktuální
          znění těchto podmínek a jakékoli pokračování v používání Aplikace po
          změnách bude považováno za výslovný souhlas s těmito změnami. Aplikace
          nenese odpovědnost za to, že Uživatel nebyl informován o změnách,
          pokud se s nimi řádně neseznámil.
          <h2>5. Řešení sporů</h2>
          Jakékoli spory vzniklé na základě těchto podmínek nebo v souvislosti s
          používáním Aplikace budou řešeny výhradně podle platného práva České
          republiky u příslušných soudů, přičemž Uživatel souhlasí s místní
          příslušností soudů v místě sídla provozovatele Aplikace.
        </Text>
      </Box>
    </Box>
  );
}

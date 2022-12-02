import axios from 'axios';
import * as cheerio from 'cheerio';

export const getCharacterPage = async () => {
  const characterPageNames = [
    'Airi_Sakura',
    'Akane_Tachibana',
    'Akito_Miyake',
    'Albert_Yamada',
    'Arisu_Sakayanagi',
    'Chairman_Sakayanagi',
    'Chiaki_Matsushita',
    'Chie_Hoshinomiya',
    'Chihiro_Shiranami',
    'Daichi_Ishizaki',
    'Haruka_Hasebe',
    'Haruki_Yamauchi',
    'Hayato_Kit%C5%8D',
    'Hideo_Sotomura',
    'Hiyori_Shiina',
    'Honami_Ichinose',
    'Ikuto_Kiriyama',
    'Kakeru_Ry%C5%ABen',
    'Kanji_Ike',
    'Kayano_Onodera',
    'Kazuma_Sakagami',
    'Kei_Karuizawa',
    'Ken_Sud%C5%8D',
    'Kiky%C5%8D_Kushida',
    'Kiyotaka_Ayanok%C5%8Dji',
    'Kokoro_Inogashira',
    'Ky%C5%8Dgo_Komiya',
    'Ky%C5%8Dsuke_Okitani',
    'K%C5%8Dhei_Katsuragi',
    'K%C5%8Dji_Machida',
    'Mako_Amikura',
    'Manabu_Horikita',
    'Masayoshi_Hashimoto',
    'Masumi_Kamuro',
    'Maya_Sat%C5%8D',
    'Mei-Yu_Wang',
    'Miki_Yamamura',
    'Minori_Kinoshita',
    'Mio_Ibuki',
    'Miyabi_Nagumo',
    'Nanami_Yabu',
    'Nazuna_Asahina',
    'Nene_Mori',
    'Professor_Ayanok%C5%8Dji',
    'Reo_Kond%C5%8D',
    'Rika_Morofuji',
    'Rokusuke_K%C5%8Denji',
    'Ry%C5%8Dtar%C5%8D_Hond%C5%8D',
    'Ry%C5%ABji_Kanzaki',
    'Sae_Chabashira',
    'Saki_Yamashita',
    'Satoru_Kaneda',
    'Satsuki_Shinohara',
    'Shiho_Manabe',
    'Suzune_Horikita',
    'S%C5%8D_Shibata',
    'Takeko_Nishino',
    'Teruhiko_Yukimura',
    'Tetsuya_Hamaguchi',
    'Tomonari_Mashima',
    'Tsukishiro',
    'Yahiko_Totsuka',
    'Yukitsu_Kusuda',
    'Yume_Kobashi',
    'Y%C5%8Dsuke_Hirata',
  ];

  return characterPageNames;
};

export const getCharacterInfo = async (characterName: string) => {
  const url = 'https://you-zitsu.fandom.com/wiki/' + characterName;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let name = $('h2[data-source="name"]').text();
  if (!name) name = (characterName.replace('_', ' ')).trim();
  if (name.includes('ō')) name = name.replace('ō', 'ou');
  if (name.includes('ū')) name = name.replace('ū', 'uu');


  let nickname: string | null = $('div[data-source="nickname"] > div.pi-data-value.pi-font > span > i > span.t_nihongo_romaji').text();
  if (!nickname) nickname = null;

  let image: string | null = $('div[data-source="image1"] > div.wds-tab__content.wds-is-current > figure.pi-item.pi-image > a.image.image-thumbnail > img').attr('srcset') as string;
  if (!nickname) image = null;

  const characterInfo = {
    name,
    nickname,
    image,
  };

  return characterInfo;
};


export const getCharacteristicsInfo = async (characterName: string) => {
  const url = 'https://you-zitsu.fandom.com/wiki/' + characterName;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let gender: string | null = ($('div[data-source="gender"] > div.pi-data-value.pi-font').text()).trim();
  if (!gender) gender = null;

  let age: number | null = Number($('div[data-source="age"] > div.pi-data-value.pi-font').text());
  if (!age || age === 0) age = null;

  let dateOfBirth: string | null = ($('div[data-source="birthday"] > div.pi-data-value.pi-font').text()).trim();
  if (!dateOfBirth) dateOfBirth = null;

  let height: number | null = Number(($('div[data-source="height"] > div.pi-data-value.pi-font').text()).slice(0, 3));
  if (!height || height === 0) height = null;

  let hairColor: string | null = $('div[data-source="haircolor"] > div.pi-data-value.pi-font').text();
  if (!hairColor) hairColor = null;

  let eyeColor: string | null = $('div[data-source="eyecolor"] > div.pi-data-value.pi-font').text();
  if (!eyeColor) eyeColor = null;

  const characteristicsInfo = {
    gender,
    age,
    dateOfBirth,
    height,
    hairColor,
    eyeColor,
  };

  return characteristicsInfo;
};

export const getProfessionalStatusInfo = async (characterName: string) => {
  const url = 'https://you-zitsu.fandom.com/wiki/' + characterName;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let schoolId: string | null = $('div[data-source="studentid"] > div.pi-data-value.pi-font').text();
  if (!schoolId) schoolId = null;

  let year: number | null = Number(($('div[data-source="class"] > div.pi-data-value.pi-font').text()).slice(6, 7));
  if (!year || year === NaN || year === 0) year = null;

  let grade: string | null = ($('div[data-source="class"] > div.pi-data-value.pi-font').text()).slice(8, 9);
  if (!grade) grade = null;

  let club: string | null = $('div[data-source="club"] > div.pi-data-value.pi-font').text();
  if (!club) club = null;

  let group: string | null = $('div[data-source="group"] > div.pi-data-value.pi-font').text();
  if (group.includes('ō')) group = group.replace('ō', 'ou');
  if (group.includes('ū')) group = group.replace('ū', 'uu');
  if (!group) group = null;

  let occupation: string | null = $('div[data-source="occupation"] > div.pi-data-value.pi-font').text();
  if (!occupation) occupation = null;

  let affiliation: string | null = $('div[data-source="affiliation"] > div.pi-data-value.pi-font').text();
  if (!affiliation) affiliation = null;



  const professionalStatusInfo = {
    schoolId,
    year,
    grade,
    club,
    group,
    occupation,
    affiliation,
  };

  return professionalStatusInfo;
};

async function characters() {
  const characterNames = await getCharacterPage();

  const characterInfoPromises = characterNames.map((characterName) =>
    getCharacterInfo(characterName),
  );
  const c = await Promise.all(characterInfoPromises);

  return c;
}

async function characteristics() {
  const characterNames = await getCharacterPage();

  const characteristicsInfoPromises = characterNames.map((characterName) =>
    getCharacteristicsInfo(characterName),
  );
  const cs = await Promise.all(characteristicsInfoPromises);

  return cs;
}

async function professionalstatus() {
  const characterNames = await getCharacterPage();

  const psInfoPromises = characterNames.map((characterName) =>
    getProfessionalStatusInfo(characterName),
  );
  const ps = await Promise.all(psInfoPromises);

  return ps;
}

export { characters, characteristics, professionalstatus };


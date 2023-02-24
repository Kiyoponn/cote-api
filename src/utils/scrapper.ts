import axios from 'axios'
import * as cheerio from 'cheerio'

import { Character, Characteristics, ProfessionalStatus } from './types'

const getCharactersName = async () => {
  const url = 'https://you-zitsu.fandom.com/wiki/Category:Characters'
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const charactersName = $('li.category-page__member > a')
    .map((_, el) => $(el).text())
    .get()

  charactersName.forEach((element, index) => {
    if (element.startsWith('Category:')) {
      charactersName.splice(index, 1)
    }
  })

  return charactersName
}

const getCharactersInfo = async (characterName: string) => {
  const url = 'https://you-zitsu.fandom.com/wiki/' + characterName
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const japaneseName = $('div[data-source="kanjiname"] > div.pi-data-value')
    .text()
    .trim()

  const name = $('h2[data-source="name"]').text().trim()

  const nickname =
    $('div[data-source="nickname"] > div.pi-data-value')
      .text()
      .replace(/(\(.*?\))|(")/g, '')
      .trim()
      .split('  ')
      .join(', ') || undefined

  let image: string | undefined
  const ds = $('[data-source="image2"]').length
  const ln = $('[title="Light Novel"]').length

  if (ds && ln) {
    image = $('[data-source="image2"]')
      .find('a[title="Light Novel"]')
      .attr('href')
  } else if (!image && ln) {
    image = $('[data-source="image1"]')
      .find('a[title="Light Novel"]')
      .attr('href')
  } else {
    image = $('[data-source="image1"]').find('a[title="Anime"]').attr('href')
  }

  const charactersInfo = new Map(
    Object.entries({
      name,
      nickname,
      japaneseName,
      image,
    })
  )

  return Object.fromEntries(charactersInfo) as Character
}

const getCharacteristics = async (characterName: string) => {
  const url = 'https://you-zitsu.fandom.com/wiki/' + characterName
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const gender = $('div[data-source="gender"] > div.pi-data-value')
    .text()
    .trim()

  const age =
    Number($('div[data-source="age"] > div.pi-data-value').text().trim()) ||
    undefined

  const dob =
    $('div[data-source="birthday"] > div.pi-data-value').text().trim() ||
    undefined

  const height =
    $('div[data-source="height"] > div.pi-data-value')
      .text()
      .replace(/\(.*?\)/g, '')
      .trim() || undefined

  const hairColor =
    $('div[data-source="haircolor"] > div.pi-data-value')
      .text()
      .replace(/(\(.*?\))|(;.*$)/g, '')
      .trim() || undefined

  const eyeColor =
    $('div[data-source="eyecolor"] > div.pi-data-value')
      .text()
      .replace(/(\(.*?\))|(;.*$)/g, '')
      .trim() || undefined

  const characteristics = new Map(
    Object.entries({
      gender,
      age,
      dob,
      height,
      hairColor,
      eyeColor,
    })
  )

  return Object.fromEntries(characteristics) as Characteristics
}

const getProfessionalStatus = async (characterName: string) => {
  const url = 'https://you-zitsu.fandom.com/wiki/' + characterName
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  const studentId =
    $('div[data-source="studentid2"] > div.pi-data-value').text().trim() ||
    undefined

  const occupation =
    $('div[data-source="occupation2"] > div.pi-data-value')
      .text()
      .replace(/\(.*?\)/g, '')
      .trim()
      .split(/(?<=Student|Teacher)(.*)/)
      .filter(Boolean)
      .join(', ') || undefined

  const splitter = $('div[data-source="class2"] > div.pi-data-value')
    .text()
    .replace(/(\(.*?\))|(")|(Class)/g, '')
    .trim()
    .split(/(.*)-(.*)/)
    .filter(Boolean)

  const year = Number(splitter[0]) || undefined
  const grade = splitter[1] || undefined

  const club =
    $('div[data-source="club2"] > div.pi-data-value').text().trim() || undefined

  const group =
    $('div[data-source="group2"] > div.pi-data-value')
      .text()
      .trim()
      .split(/(?<=Group)(.*)/)
      .filter(Boolean)
      .join(', ') || undefined

  const professionalStatus = new Map(
    Object.entries({
      studentId,
      occupation,
      year,
      grade,
      club,
      group,
    })
  )

  return Object.fromEntries(professionalStatus) as ProfessionalStatus
}

const charactersInfo = async () => {
  const charactersName = await getCharactersName()

  return Promise.all(
    charactersName.map((characterName) => getCharactersInfo(characterName))
  )
}

const characteristics = async () => {
  const charactersName = await getCharactersName()

  return Promise.all(
    charactersName.map((characterName) => getCharacteristics(characterName))
  )
}

const professionalStatus = async () => {
  const charactersName = await getCharactersName()

  return Promise.all(
    charactersName.map((characterName) => getProfessionalStatus(characterName))
  )
}

// NOTE: Uncomment this to test the functions
// ;(async () => {
//   await charactersInfo()
//   console.log(await characteristics())
//   console.log(await professionalStatus())
// })()

export { charactersInfo, characteristics, professionalStatus }

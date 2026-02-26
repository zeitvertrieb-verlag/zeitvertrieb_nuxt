import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const defaultData = {
  "orchestral-large-ensemble": [],
  "ensemble": [],
  "solo-duo": [],
  "series": [],
  "collaborations": []
}

function createDb(filename: string) {
  const file = process.cwd() + `/data/${filename}`
  const adapter = new JSONFile(file)
  return new Low(adapter, defaultData)
}

let catLambDb = null
let klangDb = null

export function getCatLambDb() {
  if (!catLambDb) {
    catLambDb = createDb('cat-lamb-works.json')
  }
  return catLambDb
}

export function getKlangDb() {
  if (!klangDb) {
    klangDb = createDb('k-lang-works.json')
  }
  return klangDb
}

export async function readWorks() {
  const database = getCatLambDb()
  await database.read()
  return database.data
}

export async function readKlangWorks() {
  const database = getKlangDb()
  await database.read()
  return database.data
}

export async function writeWorks(works) {
  const database = getCatLambDb()
  database.data = works
  await database.write()
}

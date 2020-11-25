export const SERVER_URL = "http://185.121.81.247:5505"
export const TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDYyNzk2MzMsIm5iZiI6MTYwNjI3OTYzMywianRpIjoiMzMzMTkzYmItNWI2YS00M2IyLWFmNWQtYmI3ZjI4Mjk2NDBiIiwiZXhwIjoxNjA3MTQzNjMzLCJpZGVudGl0eSI6MywiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.NftoK9adxe1lMLHcG8J90Up1VKpt_G9tZ6c235jiAG4"

export const generateLocationPOSTData = ({level, value, parentId}:any) => {
  let data: any
  switch (level) {
    case 1: {
      data = {
        area1_name: value,
        coordinate: "[222.6, 225.3]",
        area_id: parentId
      }
      break
    }
    case 2: {
      data = {
        area2_name: value,
        coordinate: "[222.6, 225.3]",
        area1_id: parentId
      }
      break
    }
    default: {
      data = {
        area_name: value,
        coordinate: "[222.6, 225.3]"
      }
    }
  }
  return data
}

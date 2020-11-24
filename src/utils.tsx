export const SERVER_URL = "http://185.121.81.247:5505"
export const TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDYxMjQ2ODEsIm5iZiI6MTYwNjEyNDY4MSwianRpIjoiYmZjZWM1MTAtMjI0MS00OWY0LWI1MjYtODVhNWIwZGVkOTg2IiwiZXhwIjoxNjA2OTg4NjgxLCJpZGVudGl0eSI6MywiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.IuA9TQkG5W906Jwsq5uNJBbOhQ5CxqqWeiSr8S1wkcg"

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

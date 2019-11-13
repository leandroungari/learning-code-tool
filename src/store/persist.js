const KEY = 'REDUX/LEARNING-CODE-TOOL';

export default function persist(key, value = undefined) {

  const data = JSON.parse(localStorage.getItem(KEY) || '{}');
  console.log("data",data)
  if(value) {
    console.log("passou", value)
    localStorage.setItem(KEY, JSON.stringify({
      ...data,
      [key]: value
    }));
  }
  else {
    return data[key];
  }
}
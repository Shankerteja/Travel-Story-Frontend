export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

export const getInitails=(name)=>{
  if(!name){
    return ""
  }
  const words=name.split(" ")
  let initials=""
  for(let i=0;i<Math.min(words.length,2);i++){
    initials+=words[i][0]

  }

  return initials.toUpperCase();
}

export const getEmptyCardMessage=(message)=>{
  switch(message){
    case 'search':
      return `!Oops No stories found matching your search.`
    case 'date':
      return `No stories found in the given date range`
    default:
      return `Start creating your first Travel Story! Click 'Add' button to join 
      down your thoughts, ideas, and memories. Let's get Started!`
  }
}
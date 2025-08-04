export function getData(val) {
    let res = new Map();
  
    for (let i = 0; i < val.length; i++) {
      if(val[i]?.type == "EXPENCE"){
        
        const key = val[i].selectedCategory?.name;
        const price = Number(val[i].price);
  
      if (res.has(key)) {
        res.set(key, res.get(key) + price);
      } else {
        res.set(key, price);
      }}
    }
      return Array.from(res.values());
  }

  
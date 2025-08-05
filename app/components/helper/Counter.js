

export function getData(val) {

  if (!Array.isArray(val)) return [];

  let res = new Map();
  
    for (let i = 0; i < val.length; i++) {
      if(val[i]?.type == "EXPENSE"){
        
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

  export const convertNumber = (num) => {
    if (num === "" || num === null || isNaN(Number(num))) return ""; 
    let n = Number(num);
    return n.toLocaleString("en-IN");
  }

export const getDate = (d) => {
  let date = new Date(d)?.toString();
        return <div className="flex flex-col" title={date?.slice(0,24)}>
          <span>{date?.slice(0,15)}</span>
          <span>{date?.slice(16,24)}</span>
        </div>
}

  
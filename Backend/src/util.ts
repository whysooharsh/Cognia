
export function helper(len : number){
    let str = "qweuerhgojsfnvoiewro";
    let n = str.length;
    let ans = "";
    for(let i = 0; i < n; i++){
        ans += str[Math.floor(Math.random()*n)];
    }
    return ans;
}
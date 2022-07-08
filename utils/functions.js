export const toSlug = (string) => {
return  string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
    
};
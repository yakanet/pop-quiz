// Visit https://icon-sets.iconify.design/ for a full listing of icons
// in your .svelte file use `import icon from 'virtual:icons/icon-set:icon-name.svg'`
// Then you can use <Icon icon={icon} /> component in your html part

declare module 'virtual:icons/*.svg' {
  const data: {
    width: number;
    height: number;
    body: string;
  };
  export default data;
}

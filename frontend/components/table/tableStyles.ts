// tableStyles.ts

export const checkboxProps = {
    classNames: {
      wrapper: "after:bg-foreground after:text-background text-background",
    },
  };
  
  export const tableClassNames = {
    wrapper: ["max-h-[382px]", "border-1"],
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    td: [
      // changing the rows border radius
      // first
      "group-data-[first=true]:first:before:rounded-none",
      "group-data-[first=true]:last:before:rounded-none",
      // middle
      "group-data-[middle=true]:before:rounded-none",
      // last
      "group-data-[last=true]:first:before:rounded-none",
      "group-data-[last=true]:last:before:rounded-none",
    ],
  };
  
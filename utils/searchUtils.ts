export const filterByKeyword = (items: any, searchWord: any) => {
  const { keyword } = searchWord;
  if (!keyword) return;
  const lowered = keyword.toLowerCase();
  return items.filter(
    ({
      url,
      title,
      description,
    }: {
      url: string;
      title: string;
      description: string;
    }) =>
      url?.toLowerCase().includes(lowered) ||
      title?.toLowerCase().includes(lowered) ||
      description?.toLowerCase().includes(lowered),
  );
};

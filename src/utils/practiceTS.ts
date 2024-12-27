const namespace = (str: string): object => {
  return str.split('.').reduceRight((acc, key) => ({ [key]: acc }), {});
};
namespace('a.b.c.d.e');
export default namespace;

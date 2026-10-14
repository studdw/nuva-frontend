const formatadorDataBrasil = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Data atual no formato YYYY-MM-DD, considerando o fuso de São Paulo. */
export function hojeNoBrasil(data = new Date()) {
  const partes = formatadorDataBrasil.formatToParts(data);
  const valor = (tipo: Intl.DateTimeFormatPartTypes) => partes.find((parte) => parte.type === tipo)?.value;

  return `${valor('year')}-${valor('month')}-${valor('day')}`;
}

// Who this site is about — used for search engines (schema.org JSON-LD).
export const SITE = 'https://roshtzsche.github.io';

export const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Rosh Guadiana Páez',
  alternateName: ['Rosh Guadiana', 'Rosh Guadiana Paez', 'RoshTzsche'],
  givenName: 'Rosh',
  familyName: 'Guadiana Páez',
  url: SITE,
  email: 'mailto:roshguadiana@gmail.com',
  jobTitle: 'Biomedical Engineering student and undergraduate researcher',
  description:
    'Biomedical Engineering student at Universidad de las Américas Puebla (UDLAP) on a 100% scholarship, member of the Honors Program and the UDLAP STEM Representative Team. Works on EEG phase-space reconstruction, nonlinear dynamics, biomedical instrumentation and research software.',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Universidad de las Américas Puebla', alternateName: 'UDLAP', url: 'https://www.udlap.mx' },
  memberOf: [
    { '@type': 'Organization', name: 'UDLAP STEM Representative Team' },
    { '@type': 'Organization', name: 'UDLAP Honors Program' },
  ],
  award: ['Greatest Technological Innovation — NASA Space Apps Challenge 2026, Puebla', '2nd place — Hackatón Puebla 2026', '2nd place national — Swift Social Change Makers Enactus 2025', 'National bronze medal — XXXI Mexican Chemistry Olympiad', '100% academic scholarship, UDLAP'],
  homeLocation: { '@type': 'Place', name: 'Durango, México' },
  knowsAbout: ['Biomedical engineering', 'EEG', 'Nonlinear dynamics', 'Takens embedding', 'Computational neuroscience', 'Metagenomics', 'Signal processing', 'Chess'],
  knowsLanguage: ['es', 'en', 'fr'],
  identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: '0009-0007-0324-3939' },
  sameAs: [
    'https://github.com/RoshTzsche',
    'https://www.linkedin.com/in/rosh-guadiana',
    'https://orcid.org/0009-0007-0324-3939',
    'https://lichess.org/@/DracoKerouac',
    'https://www.chess.com/member/ugapor',
  ],
};

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
    'Biomedical Engineering student at Universidad de las Américas Puebla (UDLAP), Honors Program. Works on EEG phase-space reconstruction, nonlinear dynamics, biomedical instrumentation and research software.',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Universidad de las Américas Puebla', alternateName: 'UDLAP', url: 'https://www.udlap.mx' },
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

module.exports = {
  default: {
    require: ['step-definitions/**/*.js'],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true
  }
};

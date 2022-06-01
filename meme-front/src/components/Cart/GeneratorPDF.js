import React, { Component } from 'react'

export default class GeneratorPDF extends Component {
  render() {
    return (
      <div>
        
        var doc = new jsPDF('p', 'pt');
        
        doc.text(20, 20, 'This is the first title.')

        doc.setFont('helvetica')
        doc.setFontType('normal')
        doc.text(20, 60, 'This is the second title.')

        doc.setFont('helvetica')
        doc.setFontType('normal')
        doc.text(20, 100, 'This is the thiRd title.')      

        doc.save('demo.pdf')
            </div>
    )
  }
}

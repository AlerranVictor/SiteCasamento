import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  dataCasamento: Date = new Date('2026-10-24T16:30:00')
  tempoNoivado: number = this.mesesNoivado()
  tempoRestante: any = {}
  private intervalId!: number

  ngOnInit(){
    this.updateContagem()
    this.intervalId = window.setInterval(() => {
      this.updateContagem()
    }, 1000)
  }

  ngOnDestroy(){
    clearInterval(this.intervalId)
  }

  updateContagem(){
    const now = new Date().getTime()
    const data = this.dataCasamento.getTime()
    const diferenca = data - now

    if(diferenca <= 0){
      this.tempoRestante = {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0
      }
      clearInterval(this.intervalId)
      return
    }

    this.tempoRestante = {
      dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diferenca / (1000 * 60)) % 60),
      segundos: Math.floor((diferenca / 1000) % 60)
    }
  }

  mesesNoivado(): number {
    let data: Date = new Date()
    let meses: number = data.getMonth() + 1
    if(data.getDate() >= 8){
      meses++
      return meses
    }
    return meses
  }

  scrollTo(id: string){
    const element = document.getElementById(id)
    if(element){
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}

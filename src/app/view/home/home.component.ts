import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  dataCasamento: Date = new Date('2026-10-24T16:30:00')
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

}

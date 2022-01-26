import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000//время, через которое alert будет исчезать

  //публичые свойства
  public text: string | any
  public type = 'success' //свойство алерта

  aSub: Subscription | any

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {

    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      //чтобы алерт исчез его нужно очистить через промежутов времени
      const timeout = setTimeout(() => {
        clearTimeout(timeout)//очистка timeout, чтобы не было утечек памяти
        this.text = '' // когда будет текст пустого значения alert исчезнет
      }, this.delay)
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}

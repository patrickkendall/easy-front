import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  host: {'(document:click)': 'onChange($event)'}
})
export class TopMenuComponent implements OnInit {

  email: string = ""
  password: string = ""
  password2: string = ""
  username: string = ""
  token: string = ""
  tokenSaved: boolean = false;

  ngOnInit(): void {
    this.token = localStorage.getItem("token") || "";
    if(this.token) {
      this.tokenSaved = true;
    } else {
      this.tokenSaved = false;
      this.router.navigateByUrl("/");
    }
  }
  @ViewChild('myLoginModal') myLoginModal: any;
  private modalRef: any;

  @ViewChild('myRegisterModal') myRegisterModal: any;
  private modalRef2: any;
  constructor(private toastr: ToastrService, private modalService: ModalManager, private http: HttpClient, private router: Router){}

  toggleMenu() {
    if((<HTMLDivElement>document.getElementById("menu")).style.visibility == "visible") {
      (<HTMLDivElement>document.getElementById("menu")).style.visibility = "hidden";
    } else {
      (<HTMLDivElement>document.getElementById("menu")).style.visibility = "visible";
    }
  }

  openModal(id: any){
    this.modalRef = this.modalService.open(id, {
        size: "md",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: true,
        closeOnOutsideClick: false,
        backdropClass: "modal-backdrop"
    })
}
openModalRegister(){
  this.modalRef = this.modalService.open(this.myRegisterModal), {
      size: "md",
      modalClass: 'mymodal2',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: true,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
  }
}
closeModal(modalRef:any){
    this.modalService.close(modalRef);
    //or this.modalRef.close();
}

logout() {
  localStorage.removeItem("token")
  this.token = ""
  this.tokenSaved = false;
  this.router.navigateByUrl("/").then(() => window.location.reload())
}

@HostListener('document:click', ['$event'])
onChangeHost(event: any) {
  if(event.target.id == "createAccount1" || event.target.id == "createAccount2") {
    this.openModalRegister()
  }
}

login() {
  if (
    this.password == '' ||
    this.email == ''
  ) {
  this.toastr.error('"Please fill in all the fields"')
  } else {
    var data = {
      password: this.password,
      email: this.email,
    };
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.http.post('https://easy-back.vercel.app/user/login', data, { headers: headers })
      .subscribe((res:any) => {
        console.log(res);
        localStorage.setItem("token", res["token"])
        this.token = res["token"]
        this.tokenSaved = true;
        this.modalService.close(this.myLoginModal);
        this.router.navigateByUrl("/account")
        this.toastr.success('"Login successful"', undefined, {
          positionClass: 'toast-top-right'
     })
      }, (error) => {
        console.log(error)
        this.toastr.error(JSON.stringify(error.error.message.replace(/"/g, '')), undefined, {
          positionClass: 'toast-top-right'})
      });
      if(this.tokenSaved) {
      }
  }


}


register() {
  if (this.password != this.password2) {
    this.toastr.error('"These passwords do not match"');
  } else if (
    this.username == '' ||
    this.password == '' ||
    this.password2 == '' ||
    this.email == ''
  ) {
    this.toastr.error('"Please fill in all the fields"');
  } else {
    var data = {
      "username": this.username,
      "password": this.password,
      "email": this.email,  
    }
    let headers = new HttpHeaders()
    headers.set("Access-Control-Allow-Origin", "*")
    this.http.post("https://easy-back.vercel.app/user/signup", data, { headers: headers}).subscribe(res => {
      console.log(res)
      this.toastr.success('"Registration Successful"')
      this.modalService.close(this.myRegisterModal);
    }, (error) => {
      this.toastr.error(JSON.stringify(error.error.message.replace(/"/g, '')))
    });
  }
}

}

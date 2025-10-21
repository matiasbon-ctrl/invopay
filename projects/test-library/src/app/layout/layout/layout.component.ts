import { Component, HostListener } from '@angular/core';
import { IpAuthService } from '../../invopay/services/ip-auth.service';
import { Router } from '@angular/router';
import { IpProfileService } from '../../invopay/services/ip-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private readonly loginService: IpAuthService , 
    private readonly router: Router,
    private ipProfileService: IpProfileService){}
    userName:string=''
    private readonly subscriptions = new Subscription();


logOut() {
  this.loginService.logOut()
  this.router.navigate(['invopay/login-broker'])
}
  collapsed = false;
  isMobile = false;

  ngOnInit() {
    const profileSubscription = this.ipProfileService.getUserProfile().subscribe({
        next: (value) => {
          this.userName = value.username;
        },
        error: (error) => {
          this.userName = "Usuario"
        }
      });
    this.subscriptions.add(profileSubscription)
    this.checkScreenSize();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // En móvil, el sidebar empieza colapsado (oculto)
    if (this.isMobile && !wasMobile) {
      this.collapsed = true;
    }
    // En desktop, el sidebar empieza expandido
    else if (!this.isMobile && wasMobile) {
      this.collapsed = false;
    }
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  // Cerrar sidebar al hacer clic en un link (solo en móvil)
  onNavLinkClick() {
    if (this.isMobile) {
      this.collapsed = true;
    }
  }
}

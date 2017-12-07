import { MapsAPILoader } from "@agm/core";
import { PasswordValidators } from "../../models/password.validators";
import { UserService } from "../../services/user.service";
import { preparseElement } from "@angular/compiler/src/template_parser/template_preparser";
import { Stats } from "../../models/business/stats.class";
import { AuthenticationService } from "../../services/authentication.service";
import { Business } from "../../models/business/business.class";
import { BusinessService } from "../../services/business.service";
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { User } from "../../models/user";
import {} from "@types/googlemaps";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  @ViewChild("searchControls") public searchElementRef: ElementRef;

  // searchControl: any;

  emailAddress: string;
  pwd: string;

  isBusiness: boolean = true;

  businessName: string;
  lat: number;
  lng: number;
  category: string = "bank";
  capacity: number = 10;

  catOptions = [
    "home affairs",
    "bank",
    "hospital",
    "police department",
    "fire department",
    "nutrition and fitness",
    "insurance",
    "city to city transport",
    "motor vehicle service",
    "retail"
  ];

  form: FormGroup;

  constructor(
    private _businessService: BusinessService,
    private _authenticationService: AuthenticationService,
    private _userService: UserService,
    fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.form = fb.group({
      userForm: fb.group({
        email: ["", [Validators.required, Validators.email]],
        passwordForm: fb.group(
          {
            password: ["", [Validators.required, Validators.minLength(8)]],
            confirmPwrd: ["", Validators.required]
          },
          {
            validator: PasswordValidators.passwordMatches
          }
        )
      }),
      businessForm: fb.group({
        name: ["", [Validators.required, Validators.minLength(3)]],
        capacity: [],
        category: ["", [Validators.required]],
        searchControl: ["", Validators.required]
      })
    });
  }

  get email() {
    return this.form.get("userForm.email");
  }

  get password() {
    return this.form.get("userForm.passwordForm.password");
  }

  get passwordForm() {
    return this.form.get("userForm.passwordForm");
  }

  get confirmPwrd() {
    return this.form.get("userForm.passwordForm.confirmPwrd");
  }

  get name() {
    return this.form.get("businessForm.name");
  }

  get searchControl() {
    return this.form.get("businessForm.searchControl");
  }

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
      });
    });
  }

  toggleUser() {
    this.isBusiness = !this.isBusiness;
  }

  register(isBusiness: boolean) {
    // let isBusiness;
    if (this.isBusiness) {
      //  isBusiness=true;
      let newDate = new Date().toString();
      let business: Business = {
        id: "",
        name: this.businessName,
        lat: this.lat,
        lng: this.lng,
        category: this.category,
        capacity: this.capacity,
        isActive: true,
        stats: [{ pax: 0, date: newDate }]
      };
      this._authenticationService.createUser(
        this.emailAddress,
        this.pwd,
        isBusiness,
        business
      );
    } else {
      // isBusiness =false;
      this._authenticationService.createUser(
        this.emailAddress,
        this.pwd,
        isBusiness
      );
    }
  }

  validForm() {
    // if(this.isBusiness){
    //   return !this.form.valid;
    // }else{
    return !this.form.get("userForm").valid;
    // }
  }

  validBusiness() {
    return !this.form.valid;
  }

  googleLogin(): void {
    //validate login
    alert(
      "Please Note That If You Are Signing In As A Business You Should Instead Create An Account Using The Register Page "
    );
    this._authenticationService.googleLogin();
  }
}

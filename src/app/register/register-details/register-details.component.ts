import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { AuthService } from './../../shared/services/auth.service';
import { UsersService } from './../../shared/services/users.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.scss']
})
export class RegisterDetailsComponent {

  // required for cropping image
  data: any;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;

  dragOver = false;

  username: string;
  hasSelected = false;
  usernameAvailable = true;
  hideAvailability: boolean;

  constructor(
    private auth: AuthService,
    private UsersService: UsersService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.rounded = true;
    this.data = {};
   }

  dropOverState($event: boolean) {
    this.dragOver = $event;
  }

   // called when uploaded via click event
  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
    this.hasSelected = true;
  }

  // called when image dragged
  fileChangeListenerDrop(fileList: FileList) {
    const image: any = new Image();
    const file: File = fileList[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
    this.hasSelected = true;
  }

  updateProfile() {
    this.hideAvailability = true;
    const croppedImage = this.data.image.split(/,(.+)/)[1];
    this.UsersService.updateProfile(this.auth.currentUserId, this.username, croppedImage);
  }

  checkUsername() {
    this.UsersService.checkUsername(this.username).subscribe(
      (name) => this.usernameAvailable = !name.$value
    );
  }


}

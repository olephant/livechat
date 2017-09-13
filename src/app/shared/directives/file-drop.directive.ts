import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  /*
  We use HostListener to listen to the following js events:

  - drop - to pass the dropped files
  - dragover - to style the dropzone
  - dragleave - revert dropzone style

  In each case we pass the $event as our args.
  We need to prevent the default action as usually
  it would redirect to the local file path

  We can use EventEmitter to pass information to
  the component the directive is placed on:

  - pass the list of files that were dropped
  - a boolean to let component know when we
    dragover/leave so we set styles

  */

  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter();

  @HostListener('drop', ['$event'])
    onDrop($event) {

    $event.preventDefault();
    // property on event we can access
    const transfer = $event.dataTransfer;
    this.filesDropped.emit(transfer.files);
    this.filesHovered.emit(false);

  }

  @HostListener('dragover', ['$event'])
    onDragOver($event) {

    $event.preventDefault();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
    onDragLeave($event) {

    $event.preventDefault();
    this.filesHovered.emit(false);
  }

}

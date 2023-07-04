import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "../model/message";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  styleUrls: ['home.component.css'],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  messageFormGroup: FormGroup;
  messages = new Array<Message>();

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.messageFormGroup = this.formBuilder.group({
      content: ['', Validators.required],
      sender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.messageFormGroup.invalid) {
      return;
    }

    const message = new Message();
    message.content = this.messageFormGroup.value.content;
    message.sender = this.messageFormGroup.value.sender;

    this.saveMessage(message).subscribe(createdMessage => {
        console.log('Message created:', createdMessage);
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating message:', error);
        if (error.status == 403) {
          this.snackBar.open('Not authorized to create messages', undefined, {duration: 5000})
        }
      })
  }

  saveMessage(message: Message) {
    console.log('Saving message: ');
    console.log(message);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<Message>("http://localhost:9090/messages", message, httpOptions);
  }

  getMessages() {
    this.httpClient.get<Array<Message>>('http://localhost:9090/messages').subscribe((res:Array<Message>) => {
      console.log(res);
      this.messages = res;
    })
  }

  getRoledMessages() {
    this.httpClient.get('http://localhost:9090/messages/read-authorized').subscribe(res => {
      console.log(res)
    })
  }

}

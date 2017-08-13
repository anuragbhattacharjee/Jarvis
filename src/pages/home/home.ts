
import { Component } from '@angular/core';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import { NavController } from 'ionic-angular';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition'
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  text: string;
  speechList : Array<string> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;

  constructor(private platform: Platform, private tts: TextToSpeech, private speech: SpeechRecognition, public navCtrl: NavController) {

  }

  listenForSpeech(): void {

    this.androidOptions = {
      prompt: 'Speak into your phone!'
    }

    this.iosOptions = {
      language: 'en-US'
    }

    if (this.platform.is('android')) {
      this.speech.startListening(this.androidOptions).subscribe(data => this.speechList = data, error => console.log(error));
    }
    else if (this.platform.is('ios')) {
      this.speech.startListening(this.iosOptions).subscribe(data => this.speechList = data, error => console.log(error));
    }
  }

  async isSpeechSupported(): Promise<boolean> {
    let isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }
  async getPermission(): Promise<void> {
    try {
      let permission = await this.speech.requestPermission();
      console.log(permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }
  async hasPermission(): Promise<boolean> {
    try {
      let permission = await this.speech.hasPermission();
      console.log(permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }
  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      let languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    }
    catch (e) {
      console.error(e);
    }
  }

  async sayText():Promise<any>{
    try{
      await this.tts.speak(this.text);
    }
    catch(e){
      console.log(e);
    }
  }

}

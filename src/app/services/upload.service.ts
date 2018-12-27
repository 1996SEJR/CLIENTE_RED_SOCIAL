import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{
    public url:string;

    constructor(){
        this.url = GLOBAL.url;
    }

    //
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
        return new Promise(function(resolve, reject){  //promesa
            var formData: any = new FormData();//similar un formulario clásico
            var xhr = new XMLHttpRequest(); //variable con un objeto para hacer peticiones ajax

            if(files){
                for(var i = 0; i<files.length; i++){
                    formData.append(name, files[i], files[i].name);
                }   

                xhr.onreadystatechange = function(){ 
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            resolve(JSON.parse(xhr.response)); //ejecutar la petición correctamente
                        }else{
                            reject(xhr.response); //no dejar hacer la petición ajax
                        }
                    }
                }
    
                xhr.open('POST', url, true); //hacer la petición ajax
                xhr.setRequestHeader('Authorization', token); //modificar la cabecera
                xhr.send(formData);
            }
            
        });
    }

}
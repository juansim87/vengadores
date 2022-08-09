import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClient: HttpClient) { }


  public characterInfo = {
    name: "",
    alterEgo: "",
    image: "",
    description:"",
    strength: "",
    intelligence: "",
    speed: "",
    alignement: "",
    id: "",
  }

  public vanishCharacter() {
    this.characterInfo = {
    name: "",
    alterEgo: "",
    image: "",
    description:"",
    strength: "",
    intelligence: "",
    speed: "",
    alignement: "",
    id: "",
    }
  }

  public editCharacter(character: any){
    this.characterInfo = character
  }

  public getCharacter() {
    return this.httpClient.get("http://localhost:3000/character")
  }

  public hireCharacter(newCharacter:any) {
    return this.httpClient.post("http://localhost:3000/character/", newCharacter)
  }

  public fireCharacter(characterID: any) {
    return this.httpClient.delete("http://localhost:3000/character/" + characterID)
  }

  public updateCharacter(characterID: any, updatedCharacter: any) {
    return this.httpClient.put("http://localhost:3000/character/" + characterID, updatedCharacter)
  }

  public villainAttack() {
    return this.httpClient.get("http://localhost:3000/villain")
  }

  }


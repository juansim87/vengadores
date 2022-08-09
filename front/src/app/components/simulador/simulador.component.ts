import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharacterInterface } from 'src/app/models/character.interface';
import { CharacterService } from './../../services/character.service';
@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss'],
})
export class SimuladorComponent implements OnInit {
  public callCharacterList: CharacterInterface[] = [];
  public characterForm!: FormGroup;
  public selectedCharacterList: CharacterInterface[] = [];

  constructor(
    private characterService: CharacterService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.characterService.getCharacter().subscribe((data: any) => {
      this.callCharacterList = data;
    });
    this.characterForm = this.formBuilder.group({
      heroOption: [''],
    });

    this.characterForm.get('heroOption')?.valueChanges.subscribe((changes) => {
      if (this.selectedCharacterList.length < 3) {
        this.recoverHero(
          this.callCharacterList,
          this.selectedCharacterList,
          changes
        );
      }
    });
  }
  public deleteSelectedCharacter(id: number) {
    this.recoverHero(this.selectedCharacterList, this.callCharacterList, id);
  }

  private recoverHero(
    selectedCharacterList: CharacterInterface[],
    callCharacterList: CharacterInterface[],
    id: number
  ) {
    if (
      selectedCharacterList.find(
        (character) => character.id.toString() === id.toString()
      )
    ) {
      const character: CharacterInterface | undefined =
        selectedCharacterList.find(
          (character) => character.id.toString() === id.toString()
        );
      if (character) {
        const index = selectedCharacterList.indexOf(character);
        callCharacterList.push(character);
        selectedCharacterList.splice(index, 1);
      }
    }
  }
}

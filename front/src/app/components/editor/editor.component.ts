import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CharacterService } from 'src/app/services/character.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharacterInterface } from 'src/app/models/character.interface';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public characterForm!: FormGroup;
  public newCharacter = this.characterService.characterInfo;
  public characterID = this.characterService.characterInfo.id;
  public submitted: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.characterService.vanishCharacter();
    this.characterForm = this.formBuilder.group({
      name: [
        this.newCharacter.name,
        [Validators.required, Validators.minLength(6)],
      ],
      alterEgo: [
        this.newCharacter.alterEgo,
        [Validators.required, Validators.minLength(6)],
      ],
      image: [this.newCharacter.image, [Validators.required]],
      description: [
        this.newCharacter.description,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(100),
        ],
      ],
      strength: [
        this.newCharacter.strength,
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      intelligence: [
        this.newCharacter.intelligence,
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      speed: [
        this.newCharacter.speed,
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
    });

    this.characterForm.valueChanges.subscribe((changes) => {
      this.newCharacter = changes;
    });
  }

  public onSubmit() {
    if (this.characterID !== '') {
      this.characterService
        .updateCharacter(this.characterID, this.newCharacter)
        .subscribe();
      Swal.fire('¡Información del héroe actualizada!', 'Está fino', 'success');
    } else {
      this.characterService.hireCharacter(this.newCharacter).subscribe();
      Swal.fire(
        '¡Llamada al héroe existosa!',
        'A trabajar, ¡GANDUL!',
        'success'
      );
    }

    this.characterForm.reset();
    this.router.navigate(['/visualizador']);

    this.submitted = true;

    if (this.characterForm.valid) {
      const character: CharacterInterface = {
        name: this.characterForm.get('name')?.value,
        alterEgo: this.characterForm.get('alterEgo')?.value,
        image: this.characterForm.get('image')?.value,
        description: this.characterForm.get('image')?.value,
        strength: this.characterForm.get('description')?.value,
        intelligence: this.characterForm.get('intelligence')?.value,
        speed: this.characterForm.get('speed')?.value,
        id: this.characterForm.get('id')?.value,
      };

      console.log(character);

      this.characterForm.reset();

      this.submitted = false;
    }
  }

  public fire() {
    if (confirm('¿Quieres despedir a este héroe?') === true) {
      this.characterService.fireCharacter(this.characterID).subscribe();
      this.characterForm.reset();
      Swal.fire({
        icon: 'error',
        title: 'Héroe despedido',
        text: 'Menudo loser',
      });
      this.router.navigate(['/visualizador']);
    } else {
      this.router.navigate(['/visualizador']);
    }
  }
}

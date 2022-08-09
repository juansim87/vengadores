import { Component, OnInit } from '@angular/core';
import { CharacterInterface } from 'src/app/models/character.interface';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';
@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.scss'],
})
export class VisualizadorComponent implements OnInit {
  public heroSquad: CharacterInterface[] = [];

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.characterService.getCharacter().subscribe((data: any) => {
      this.heroSquad = data;
    });
  }

  public catchCharacter(character: any) {
    this.characterService.editCharacter(character);
    this.router.navigate(['/editor']);
  }
}

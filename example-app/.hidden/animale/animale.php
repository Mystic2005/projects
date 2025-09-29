<?php
  class Carte {
      private string $titlu;
      private string $autor;

      public function __construct(string $titlu, string $autor) {
          $this->titlu = $titlu;
          $this->autor = $autor;
      }

      public function descriere(): string {
          return "$this->titlu de $this->autor";
      }
  }



  
  abstract class Utilizator {
      protected string $nume;

      public function __construct(string $nume) {
          $this->nume = $nume;
      }

      public function getNume(): string {
          return $this->nume;
      }

      abstract public function tip(): string;
  }

  class Student extends Utilizator {
      public function tip(): string {
          return "Student";
      }
  }

  class Profesor extends Utilizator {
      public function tip(): string {
          return "Profesor";
      }
  }



  class Imprumut {
      private Carte $carte;
      private Utilizator $utilizator;
      private DateTime $dataImprumut;

      public function __construct(Carte $carte, Utilizator $utilizator) {
          $this->carte = $carte;
          $this->utilizator = $utilizator;
          $this->dataImprumut = new DateTime();
      }

      public function afiseaza(): string {
          return "{$this->utilizator->getNume()} ({$this->utilizator->tip()}) a împrumutat „{$this->carte->descriere()}” pe {$this->dataImprumut->format('Y-m-d')}";
      }
  }


?>
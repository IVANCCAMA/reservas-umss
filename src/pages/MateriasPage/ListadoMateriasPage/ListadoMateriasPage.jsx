import { useEffect, useState } from 'react';
import './ListadoMateriasPage.scss';
import axios from 'axios';
import Table from '../../../components/Table/Table';
import Pagination from '../../../components/Pagination/Pagination';

const ListadoMateriasPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  // estados
  // const [materias, setMaterias] = useState([]);

  // variables
  // maperar el json para que se muestre solo los keys necesarios (ver materias[0])
  const materiasJSON = [
    {
      Materia: 'Matemáticas',
      Nivel: 'Bachillerato',
      Grupo: 'A',
      Inscritos: 30,
      Docentes: 'María López'
    },
    {
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Matemáticas',
      Nivel: 'Bachillerato',
      Grupo: 'A',
      Inscritos: 30,
      Docentes: 'María López'
    },
    {
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 2,
      Materia: 'Historia',
      Nivel: 'Secundaria',
      Grupo: 'B',
      Inscritos: 25,
      Docentes: 'Pedro García'
    },
    {
      id: 3,
      Materia: 'Ciencias Naturales',
      Nivel: 'Primaria',
      Grupo: 'C',
      Inscritos: 20,
      Docentes: 'Ana Martínez'
    },
    {
      id: 4,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 5,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 6,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 7,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 8,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 9,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 10,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    },
    {
      id: 11,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Sofía Ramírez'
    },
    {
      id: 12,
      Materia: 'Literatura',
      Nivel: 'Bachillerato',
      Grupo: 'D',
      Inscritos: 28,
      Docentes: 'Luis Hernández'
    }
  ];

  // limpieza del archivo JSON para la tabla
  const materias = materiasJSON.map(mat => {
    return {
      Materia: mat.Materia,
      Nivel: mat.Nivel,
      Grupo: mat.Grupo,
      Inscritos: mat.Inscritos,
      Docentes: mat.Docentes
    };
  });

  // >>> FUTURO <<<  
  // obtener valores de un key
  const materiasKey = materias.map(mat => mat.Nivel);
  // filtro para obtener solo los valores únicos 
  const keyUnicos = [...new Set(materiasKey)];

  // logic
  // const loadMaterias = () => {
  //   // Realizar la solicitud a la API
  //   axios
  //     .get('https://api-url.com/materias')
  //     .then((response) => {
  //       // Establecer los datos en el estado
  //       setMaterias(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error al obtener las materias:', error);
  //     });
  //   //api
  // };

  // useEffect(() => {
  //   loadMaterias();
  // }, []);

  return (
    <div className="container listado-materias p-5">
      <h2 className="text-start pb-4">Materias registradas</h2>

      {/* Se puede parametrizar la cantidad de filas mostradas por hojas */}
      <Table rows={materias} firstRow={(pageNumber - 1) * 10} lastRow={pageNumber * 10} />

      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} lastPage={Math.floor(materias.length / 10) + 1} />
    </div>
  );
};

export default ListadoMateriasPage;

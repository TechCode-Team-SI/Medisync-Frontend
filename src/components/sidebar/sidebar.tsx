import { User } from 'lucide-react';
import React from 'react';

import { paths } from 'src/paths';

import Agenda from '../ui/icons/agenda';
import Calendar from '../ui/icons/calendar';
import CalendarAgg from '../ui/icons/calendarAgg';
import Claims from '../ui/icons/claims';
import Clock from '../ui/icons/clock';
import Form from '../ui/icons/form';
import Home from '../ui/icons/home';
import Injuries from '../ui/icons/injuries';
import Location from '../ui/icons/location';
import Logo from '../ui/icons/logo';
import MedicalStaff from '../ui/icons/medicalStaff';
import Publications from '../ui/icons/publications';
import Questions from '../ui/icons/questions';
import Rol from '../ui/icons/rol';
import Specialties from '../ui/icons/specialties';
import Suggestions from '../ui/icons/suggestions';

import {
  SidebarLogoContainer,
  SidebarContainer,
  SidebarOptions,
  SideBarList,
  SidebarDescription,
  SidebarContainerLink,
  SidebarLink,
  SidebarCopyRight,
  SidebarCopyRightContainer,
  SidebarTextLink,
} from './components';

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarLogoContainer>
        <Logo fill='white' className='h-[76px] w-[66px]' />
      </SidebarLogoContainer>

      <SidebarOptions>
        <SideBarList>
          {/* Servicios */}
          <SidebarDescription>SERVICIOS</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink to={paths.dashboard}>
                <Home className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Dashboard</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
          </SideBarList>
          {/* Citas */}
          <SidebarDescription>CITAS</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#citas_medicas');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <CalendarAgg className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Citas médicas</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='citas_medicas' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to={paths.appointments} variant={'secondary'}>
                  <Home className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver citas</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Home className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Atender citas</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Calendar className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Calendario</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          {/* Gestion de usuarios */}
          <SidebarDescription>GESTIÓN DE USUARIOS</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#personal_medico');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <MedicalStaff className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Personal médico</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='personal_medico' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <MedicalStaff className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar personal</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <MedicalStaff className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar personal</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Agenda className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Asignar agenda</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#especialidades');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Specialties className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Epecialidades</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='especialidades' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to={paths.registerSpecialty} variant={'secondary'}>
                  <Specialties className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar especialidad</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to={paths.editSpecialty} variant={'secondary'}>
                  <Specialties className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar especialidad</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to={paths.disableSpecialty} variant={'secondary'}>
                  <Specialties className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Deshabilitar especialidad</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to={paths.assignTemplate} variant={'secondary'}>
                  <Specialties className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Asignar plantilla</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#usuarios');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <User className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Ususarios</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='usuarios' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to={paths.userview} variant={'secondary'}>
                  <User className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver usuarios</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          {/* Configuración */}
          <SidebarDescription>CONFIGURACIÓN</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#horarios');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Horarios</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='horarios' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to={paths.registerSchedules} variant={'secondary'}>
                  <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Horario</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to={paths.editSchedules} variant={'secondary'}>
                  <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Horario</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to={paths.disableSchedules} variant={'secondary'}>
                  <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Deshabilitar Horario</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#agenda_laboral');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Agenda Laboral</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='agenda_laboral' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Agenda</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Agenda</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Clock className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Deshabilitar Agenda</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#areas');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Location className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Áreas</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='areas' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Location className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Área</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Location className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Área</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Location className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Deshabilitar Área</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#roles');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Rol className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Roles</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='roles' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Rol className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Rol</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Rol className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Rol</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Rol className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Asignar Rol</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Rol className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Eliminar Rol</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          {/* Diagnósticos */}
          <SidebarDescription>DIAGNÓSTICOS</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#lesiones');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Lesiones</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='lesiones' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Lesión</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Lesión</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver Lesión</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Eliminar Lesión</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#patologias');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Patologías</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='patologias' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Patología</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Patología</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver Patología</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Eliminar Patología</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#sintomas');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Síntomas</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='sintomas' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Síntoma</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Síntoma</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver Síntoma</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Eliminar Síntoma</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#enfermedades');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Enfermedades</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='enfermedades' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Registrar Enfermedad</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Enfermedad</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver Enfermedad</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Injuries className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Eliminar Enfermedad</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          {/* Formularios */}
          <SidebarDescription>FORMULARIOS</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#formularios');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Form className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Formularios</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='formularios' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Form className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Crear Formulario</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Form className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Deshabilitar Formularios</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#preguntas');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Questions className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Preguntas</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='preguntas' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Questions className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Crear Pregunta</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Questions className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Eliminar Pregunta</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          {/* Publicaciones */}
          <SidebarDescription>PUBLICACIONES</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#publicaciones');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Publications className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Publicaciones</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='publicaciones' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Publications className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Crear Publicación</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Publications className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Editar Publicación</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Publications className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Eliminar Publicación</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Publications className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Deshabilitar Publicación</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          {/* Asistencia */}
          <SidebarDescription>ASISTENCIA</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#reclamos');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Claims className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Reclamos</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='reclamos' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Claims className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver Reclamo</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Claims className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Atender Reclamo</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink
                to='#'
                onClick={() => {
                  const ul: HTMLUListElement | null = document.querySelector('#sugerencias');
                  ul ? (ul.className === 'hidden' ? (ul.className = '') : (ul.className = 'hidden')) : null;
                }}
              >
                <Suggestions className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Sugerencias</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
            <SideBarList id='sugerencias' className='hidden'>
              <SidebarContainerLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Suggestions className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Ver Sugerencia</SidebarTextLink>
                </SidebarLink>
                <SidebarLink to='#' variant={'secondary'}>
                  <Suggestions className='w-[19px] h-[18px] mr-3 fill-current' />
                  <SidebarTextLink>Atender Sugerencia</SidebarTextLink>
                </SidebarLink>
              </SidebarContainerLink>
            </SideBarList>
          </SideBarList>
          {/* Mis ajustes */}
          <SidebarDescription>Mis ajustes</SidebarDescription>
          <SideBarList>
            <SidebarContainerLink>
              <SidebarLink to={paths.editProfile}>
                <User className='w-[19px] h-[18px] mr-3 fill-current' />
                <SidebarTextLink>Mi perfil</SidebarTextLink>
              </SidebarLink>
            </SidebarContainerLink>
          </SideBarList>
        </SideBarList>
      </SidebarOptions>
      <SidebarCopyRightContainer>
        <SidebarCopyRight>Por TechCode</SidebarCopyRight>
      </SidebarCopyRightContainer>
    </SidebarContainer>
  );
}

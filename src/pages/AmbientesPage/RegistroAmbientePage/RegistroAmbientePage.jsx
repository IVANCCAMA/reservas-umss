const RegistroAmbientePage = () => {
  const horarios = [
    {
      nombre: 'Lunes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Martes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Miércoles',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Juevez',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Viernes',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
    {
      nombre: 'Sabado',
      periodos: [
        {
          id: 1,
          horario: '6:45 - 8:15',
        },
        {
          id: 2,
          horario: '8:15 - 9:45',
        },
        {
          id: 3,
          horario: '9:45 - 11:15',
        },
        {
          id: 4,
          horario: '11:15 - 12:45',
        },
        {
          id: 5,
          horario: '12:45 - 14:15',
        },
        {
          id: 6,
          horario: '14:15 - 15:45',
        },
        {
          id: 7,
          horario: '15:45 - 17:15',
        },
        {
          id: 8,
          horario: '17:15 - 18:45',
        },
        {
          id: 9,
          horario: '18:45 - 20:15',
        },
        {
          id: 10,
          horario: '20:15 - 21:45',
        },
      ],
    },
  ];

  return (
    <div className="container">
      <div className="row py-md-3 justify-content-center">
        <div className="col-md-6">
          <h2 className="text-md-center">Registrar ambientes</h2>
          <form>
            <div className="my-3">
              <label className="form-label">Nombre de ambiente *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Escriba el nombre del ambiente"
                /* {...register('propiedad_')} */
              />
              {/* {errors.propiedad_ && (
                <span className="badge text-bg-danger">El campo es obligatorio</span>
              )} */}
            </div>
            <div className="my-3">
              <label className="form-label">Tipo de ambiente *</label>
              <select
                className="form-select"
                id="country"
                required=""
                placeholder="Seleccione el tipo de ambiente"
              >
                <option value="">Seleccione el tipo de ambiente</option>
                <option>Aula común</option>
                <option>Auditorio</option>
                <option>Laboratorio</option>
              </select>
              {/* {errors.propiedad_ && (
                <span className="badge text-bg-danger">El campo es obligatorio</span>
              )} */}
            </div>
            <div className="my-3">
              <label className="form-label">Ubicación</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Escriba la ubicación del ambiente"
                /* {...register('propiedad_')} */
              />
              {/* {errors.propiedad_ && (
                <span className="badge text-bg-danger">El campo es obligatorio</span>
              )} */}
            </div>
            <div className="row">
              <div className="my-3 col-md-6">
                <label className="form-label">Capacidad de estudiantes</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escriba la capacidad de estudiantes"
                  /* {...register('propiedad_')} */
                />
                {/* {errors.propiedad_ && (
                <span className="badge text-bg-danger">El campo es obligatorio</span>
              )} */}
              </div>
              <div className="my-3 col-md-3">
                <label className="form-label">Max *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cap. maxima"
                  /* {...register('propiedad_')} */
                />
                {/* {errors.propiedad_ && (
                <span className="badge text-bg-danger">El campo es obligatorio</span>
              )} */}
              </div>
              <div className="my-3 col-md-3">
                <label className="form-label">Min *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cap. de minima"
                  /* {...register('propiedad_')} */
                />
                {/* {errors.propiedad_ && (
                <span className="badge text-bg-danger">El campo es obligatorio</span>
              )} */}
              </div>
            </div>

            <div className="my-3">
              <p className="fs-4">Equipamiento de ambiente</p>
              <label className="form-label">N Computadoras</label>
              <input
                type="text"
                className="form-control"
                placeholder="Escriba el número de computadoras"
                /* {...register('propiedad_')} */
              />
              {/* {errors.propiedad_ && (
                <span className="badge text-bg-danger">El campo es obligatorio</span>
              )} */}
            </div>

            {/* Horarios */}
            <div className="my-3">
              {console.log(horarios)}
              <label className="form-label fs-4">Días y horarios disponibles</label>
              {horarios.map((horario, index) => {
                return (
                  <div key={index}>
                    <button
                      className="form-select text-start rounded-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${horario.nombre}`}
                      aria-expanded="false"
                      aria-controls={`collapse${horario.nombre}`}
                    >
                      {horario.nombre}
                    </button>
                    <div className="collapse" id={`collapse${horario.nombre}`}>
                      <div className="card card-body">
                        <div className="d-flex flex-md-row justify-content-between">
                          <p>Periodos</p>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label me-md-2" htmlFor="flexCheckDefault">
                              Seleccionar todo
                            </label>
                          </div>
                        </div>
                        <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-2">
                          {horario.periodos.map((periodo, index) => {
                            return (
                              <div className="col" key={index}>
                                <div className="form-check">
                                  <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {periodo.horario}
                                  </label>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* <div className="d-flex flex-md-row-reverse justify-content-between">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              20:15 - 21:45
                            </label>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                className="form-select text-start rounded-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSabado"
                aria-expanded="false"
                aria-controls="collapseSabado"
              >
                Sábado
              </button>
              <div className="collapse" id="collapseSabado">
                <div className="card card-body">
                  <div className="d-flex flex-md-row justify-content-between">
                    <p>Periodos</p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Todo
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-md-row justify-content-between">
                    <div className="form-check">
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        06:45 - 08:15
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        08:15 - 09:45
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        09:45 - 11:15
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-md-row justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        11:15 - 12:45
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        12:45 - 14:15
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        14:45 - 15:15
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-md-row justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        15:45 - 17:15
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        17:15 - 18:45
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        18:45 - 20:15
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-md-row-reverse justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        20:15 - 21:45
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* <p className="d-flex flex-column">
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Lunes
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Martes
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Miercoles
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Juevez
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Viernes
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample2"
                  aria-expanded="false"
                  aria-controls="collapseExample2"
                >
                  Sábado
                </button>
              </p> */}
            </div>
            {/* <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div> */}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary me-md-5">
                Registrar
              </button>
              <button type="submit" className="btn btn-primary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroAmbientePage;

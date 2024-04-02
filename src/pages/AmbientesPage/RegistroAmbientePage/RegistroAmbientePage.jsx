const RegistroAmbientePage = () => {
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
              <label className="form-label fs-4">Días y horarios disponibles</label>
              <button
                className="form-select text-start rounded-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLunes"
                aria-expanded="false"
                aria-controls="collapseLunes"
              >
                Lunes
              </button>
              <div className="collapse" id="collapseLunes">
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

              <button
                className="form-select text-start rounded-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMartes"
                aria-expanded="false"
                aria-controls="collapseMartes"
              >
                Martes
              </button>
              <div className="collapse" id="collapseMartes">
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

              <button
                className="form-select text-start rounded-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMiercoles"
                aria-expanded="false"
                aria-controls="collapseMiercoles"
              >
                Miércoles
              </button>
              <div className="collapse" id="collapseMiercoles">
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

              <button
                className="form-select text-start rounded-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseJuevez"
                aria-expanded="false"
                aria-controls="collapseJuevez"
              >
                Juevez
              </button>
              <div className="collapse" id="collapseJuevez">
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

              <button
                className="form-select text-start rounded-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseViernes"
                aria-expanded="false"
                aria-controls="collapseViernes"
              >
                Viernes
              </button>
              <div className="collapse" id="collapseViernes">
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

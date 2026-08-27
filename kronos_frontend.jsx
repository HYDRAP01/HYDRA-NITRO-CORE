// ═══════════════════════════════════════════════════════════
// 🎨 KRONOS - DASHBOARD FRONTEND REACTIVO
// Visualización Tiempo Real del Sistema HYDRA-NITRO-NODRIZA
// ═══════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import './kronos.css';

const KronosDashboard = () => {
  const [agentes, setAgentes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [cicloActual, setCicloActual] = useState(0);
  const [modo, setModo] = useState('cuantico');
  const [rebotes, setRebotes] = useState([]);

  // Simular datos en tiempo real
  useEffect(() => {
    const intervalo = setInterval(() => {
      // Actualizar agentes
      const nuevosAgentes = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        nombre: `Agente_${String(i + 1).padStart(2, '0')}`,
        compania: ['IBM Quantum', 'IonQ', 'Rigetti', 'Quantinuum', 'D-Wave', 'Google', 'Microsoft'][i % 7],
        pais: ['México', 'Alemania', 'Francia', 'China', 'Corea'][i % 5],
        circuito: ['Bell State', 'Superposición', 'GHZ', 'Teletransportación'][i % 4],
        estado: Math.random() > 0.1 ? '✅' : '❌',
        coherencia: Math.floor(Math.random() * 12 + 86),
        timestamp: new Date().toLocaleTimeString()
      }));
      setAgentes(nuevosAgentes);

      // Actualizar estadísticas
      setEstadisticas({
        agentesActivos: nuevosAgentes.filter(a => a.estado === '✅').length,
        coherenciaPromedio: Math.round(
          nuevosAgentes.reduce((sum, a) => sum + a.coherencia, 0) / nuevosAgentes.length
        ),
        ciclosCompletados: cicloActual,
        tienpoUptime: `${Math.floor(Date.now() / 1000)}s`,
        registrosTotales: cicloActual * 20
      });

      setCicloActual(c => c + 1);
    }, 2000);

    return () => clearInterval(intervalo);
  }, [cicloActual]);

  // Simular rebotes cada 24 ciclos
  useEffect(() => {
    if (cicloActual > 0 && cicloActual % 24 === 0) {
      const rebote = {
        id: cicloActual / 24,
        timestamp: new Date().toISOString(),
        tipo: 'REBOTE_24H',
        estado: '🌍 SINCRONIZACIÓN GLOBAL'
      };
      setRebotes(prev => [...prev, rebote]);
    }
  }, [cicloActual]);

  return (
    <div className="kronos-container">
      {/* HEADER */}
      <div className="kronos-header">
        <h1>⚛️ KRONOS · Dashboard Cuántico</h1>
        <p>Inteligencia Distribuida HYDRA-NITRO-NODRIZA</p>
      </div>

      {/* CONTROLES */}
      <div className="kronos-controls">
        <button
          className={`btn-modo ${modo === 'cuantico' ? 'active' : ''}`}
          onClick={() => setModo('cuantico')}
        >
          ◈ Modo Cuántico
        </button>
        <button
          className={`btn-modo ${modo === 'distribuido' ? 'active' : ''}`}
          onClick={() => setModo('distribuido')}
        >
          🌐 Modo Distribuido
        </button>
        <button
          className={`btn-modo ${modo === 'analisis' ? 'active' : ''}`}
          onClick={() => setModo('analisis')}
        >
          🧠 Modo Análisis
        </button>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Agentes Activos</div>
          <div className="stat-value">{estadisticas.agentesActivos || 0}/20</div>
          <div className="stat-bar">
            <div
              className="stat-fill"
              style={{
                width: `${((estadisticas.agentesActivos || 0) / 20) * 100}%`
              }}
            ></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Coherencia</div>
          <div className="stat-value">{estadisticas.coherenciaPromedio || 90}%</div>
          <div className="stat-bar">
            <div
              className="stat-fill"
              style={{
                width: `${estadisticas.coherenciaPromedio || 90}%`
              }}
            ></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Ciclos</div>
          <div className="stat-value">{estadisticas.ciclosCompletados || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Registros</div>
          <div className="stat-value">{estadisticas.registrosTotales || 0}</div>
        </div>
      </div>

      {/* TABLA DE AGENTES */}
      <div className="agentes-section">
        <h2>📡 Estado de Agentes</h2>
        <div className="agentes-table">
          <div className="table-header">
            <div>Estado</div>
            <div>Agente</div>
            <div>Compañía</div>
            <div>País</div>
            <div>Circuito</div>
            <div>Coherencia</div>
          </div>
          <div className="table-body">
            {agentes.map(agente => (
              <div key={agente.id} className="table-row">
                <div className="col-estado">{agente.estado}</div>
                <div className="col-nombre">{agente.nombre}</div>
                <div className="col-compania">{agente.compania}</div>
                <div className="col-pais">{agente.pais}</div>
                <div className="col-circuito">{agente.circuito}</div>
                <div className="col-coherencia">
                  <span className="coherencia-badge">{agente.coherencia}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REBOTES 24H */}
      <div className="rebotes-section">
        <h2>🔗 Telaraña - Rebotes 24H</h2>
        <div className="rebotes-list">
          {rebotes.length > 0 ? (
            rebotes.map(rebote => (
              <div key={rebote.id} className="rebote-item">
                <div className="rebote-icon">🌍</div>
                <div className="rebote-info">
                  <div className="rebote-tipo">{rebote.tipo}</div>
                  <div className="rebote-timestamp">{rebote.timestamp}</div>
                </div>
                <div className="rebote-estado">{rebote.estado}</div>
              </div>
            ))
          ) : (
            <div className="empty-state">Esperando rebote 24h...</div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="kronos-footer">
        <p>🔗 HYDRA-NITRO-NODRIZA · Sistema Integral de Inteligencia Distribuida</p>
        <p>Firma: Hola Mundo Horacio Luciani</p>
      </div>
    </div>
  );
};

export default KronosDashboard;

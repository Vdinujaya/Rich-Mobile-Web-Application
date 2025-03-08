const StatsCard = ({ icon, title, value, trend }) => {
    const trendColor = trend > 0 ? '#4CAF50' : '#F44336';
    
    return (
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: trendColor + '20' }}>
          {icon}
        </div>
        <div className="stats-info">
          <h3>{title}</h3>
          <h2>{value}</h2>
          <span style={{ color: trendColor }}>
            {trend > 0 ? '+' : ''}{trend}% vs last month
          </span>
        </div>
      </div>
    );
  };
  
  export default StatsCard;
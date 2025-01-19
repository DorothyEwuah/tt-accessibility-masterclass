class AccessibleLiquidButton {
    constructor(optionsParam) {
      const options = optionsParam || {};
      
      // Core button properties
      this.text = options.text || 'Click Me';
      this.width = options.width || 200;
      this.height = options.height || 50;
      this.ariaLabel = options.ariaLabel || this.text;
      this.onClick = options.onClick || (() => {});

      
      // Physics and animation properties
      this.margin = (window.innerHeight / 2) - (this.height / 2);
      this.tension = 0.4;
      this.padding = 0;
      this.gap = 2;
      this.forceFactor = 0.2;
      this.hoverFactor = -0.1;
      this.noise = 0;
      
      // High contrast colors
      this.color1 = options.color1 || '#36DFE7';
      this.color2 = options.color2 || '#d53c76';
      this.color3 = options.color3 || '#E509E6'; // Darker red
      this.textColor = '#FFFFFF'; // White
      this.focusOutlineColor = '#2ECC71'; // Bright green
      
      // Reduced motion setting detection
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Create wrapper button element
      this.buttonElement = document.createElement('button');
      this.buttonElement.setAttribute('aria-label', this.ariaLabel);
      this.buttonElement.setAttribute('role', 'button');
      this.buttonElement.setAttribute('type', 'button');
      this.buttonElement.className = 'liquid-button';
      
      // Create canvas
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('aria-hidden', 'true');
      this.context = this.canvas.getContext('2d');
      
      // Create text span for better accessibility
      this.textElement = document.createElement('span');
      this.textElement.className = 'liquid-button-text';
      this.textElement.textContent = this.text;
      
      // Liquid animation layers
      this.layers = [{
        points: [],
        viscosity: 0.5,
        mouseForce: 100,
        forceLimit: 2,
      }, {
        points: [],
        viscosity: 0.8,
        mouseForce: 150,
        forceLimit: 3,
      }];
      
      // Initialize touch tracking
      this.touches = [];
      
      // Assemble elements
      this.buttonElement.appendChild(this.canvas);
      this.buttonElement.appendChild(this.textElement);
      
      // Add to wrapper if provided
      this.wrapperElement = options.wrapperElement || document.body;
      if (!this.buttonElement.parentElement) {
        this.wrapperElement.appendChild(this.buttonElement);
      }
      
      // Add event listeners
      this.setupEventListeners();
      
      // Initialize button
      this.initOrigins();
      
      // Start animation if motion is allowed
      if (!this.prefersReducedMotion) {
        this.animate();
      } else {
        this.drawStatic();
      }
      
      // Add styles
      this.addStyles();
    }
  
    // Event Listeners Setup
    setupEventListeners() {
      this.buttonElement.addEventListener('mousemove', this.handleMouseMove);
      this.buttonElement.addEventListener('mouseleave', this.handleMouseLeave);
      this.buttonElement.addEventListener('keydown', this.handleKeyDown);
      this.buttonElement.addEventListener('focus', this.handleFocus);
      this.buttonElement.addEventListener('blur', this.handleBlur);
      this.buttonElement.addEventListener('touchstart', this.handleTouchStart);
      this.buttonElement.addEventListener('touchmove', this.handleTouchMove);
      this.buttonElement.addEventListener('touchend', this.handleTouchEnd);
      this.buttonElement.addEventListener('click', (e) => this.onClick(e));
    }
  
    // Event Handlers
    handleMouseMove = (e) => {
      if (this.prefersReducedMotion) return;
      const rect = this.canvas.getBoundingClientRect();
      this.touches = [{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        force: 1,
      }];
    }
  
    handleMouseLeave = () => {
      this.touches = [];
    }
  
    handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!this.prefersReducedMotion) {
          this.touches = [{
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            force: 1,
          }];
        }
        this.buttonElement.click();
      }
    }
  
    handleFocus = () => {
      if (!this.prefersReducedMotion) {
        this.touches = [{
          x: this.canvas.width / 2,
          y: this.canvas.height / 2,
          force: 0.5,
        }];
      }
    }
  
    handleBlur = () => {
      this.touches = [];
    }
  
    handleTouchStart = (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.touches = [{
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        force: 1,
      }];
    }
  
    handleTouchMove = (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.touches = [{
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        force: 1,
      }];
    }
  
    handleTouchEnd = () => {
      this.touches = [];
    }
  
    // Physics Methods
    distance(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
  
    update() {
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        const points = layer.points;
        
        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const point = points[pointIndex];
          const dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
          const dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
          const d = Math.sqrt(dx * dx + dy * dy);
          const f = d * this.forceFactor;
          point.vx += f * ((dx / d) || 0);
          point.vy += f * ((dy / d) || 0);
          
          for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
            const touch = this.touches[touchIndex];
            let mouseForce = layer.mouseForce;
            if (
              touch.x > this.margin &&
              touch.x < this.margin + this.width &&
              touch.y > this.margin &&
              touch.y < this.margin + this.height
            ) {
              mouseForce *= -this.hoverFactor;
            }
            const mx = point.x - touch.x;
            const my = point.y - touch.y;
            const md = Math.sqrt(mx * mx + my * my);
            const mf = Math.max(-layer.forceLimit, Math.min(layer.forceLimit, (mouseForce * touch.force) / md));
            point.vx += mf * ((mx / md) || 0);
            point.vy += mf * ((my / md) || 0);
          }
          
          point.vx *= layer.viscosity;
          point.vy *= layer.viscosity;
          point.x += point.vx;
          point.y += point.vy;
        }
        
        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const prev = points[(pointIndex + points.length - 1) % points.length];
          const point = points[pointIndex];
          const next = points[(pointIndex + points.length + 1) % points.length];
          const dPrev = this.distance(point, prev);
          const dNext = this.distance(point, next);
  
          const line = {
            x: next.x - prev.x,
            y: next.y - prev.y,
          };
          const dLine = Math.sqrt(line.x * line.x + line.y * line.y);
  
          point.cPrev = {
            x: point.x - (line.x / dLine) * dPrev * this.tension,
            y: point.y - (line.y / dLine) * dPrev * this.tension,
          };
          point.cNext = {
            x: point.x + (line.x / dLine) * dNext * this.tension,
            y: point.y + (line.y / dLine) * dNext * this.tension,
          };
        }
      }
    }
  
    animate = () => {
      this.update();
      this.draw();
      requestAnimationFrame(this.animate);
    }
  
    draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        
        if (layerIndex === 1) {
          if (this.touches.length > 0) {
            const gx = this.touches[0].x;
            const gy = this.touches[0].y;
            layer.color = this.context.createRadialGradient(gx, gy, this.height * 2, gx, gy, 0);
            layer.color.addColorStop(0, this.color2);
            layer.color.addColorStop(1, this.color3);
          } else {
            layer.color = this.color2;
          }
        } else {
          layer.color = this.color1;
        }
        
        const points = layer.points;
        this.context.fillStyle = layer.color;
        
        this.context.beginPath();
        this.context.moveTo(points[0].x, points[0].y);
        
        for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
          this.context.bezierCurveTo(
            points[(pointIndex + 0) % points.length].cNext.x,
            points[(pointIndex + 0) % points.length].cNext.y,
            points[(pointIndex + 1) % points.length].cPrev.x,
            points[(pointIndex + 1) % points.length].cPrev.y,
            points[(pointIndex + 1) % points.length].x,
            points[(pointIndex + 1) % points.length].y
          );
        }
        
        this.context.fill();
      }
    }
  
    drawStatic() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      const gradient = this.context.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0, this.color1);
      gradient.addColorStop(1, this.color2);
      
      this.context.fillStyle = gradient;
      this.context.beginPath();
      this.context.roundRect(
        this.margin,
        this.margin,
        this.width,
        this.height,
        this.height / 2
      );
      this.context.fill();
    }
  
    createPoint(x, y) {
      return {
        x: x,
        y: y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0,
      };
    }
  
    initOrigins() {
      this.canvas.width = this.width + this.margin * 2;
      this.canvas.height = this.height + this.margin * 2;
  
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        const points = [];
        
        for (let x = ~~(this.height / 2); x < this.width - ~~(this.height / 2); x += this.gap) {
          points.push(this.createPoint(
            x + this.margin,
            this.margin
          ));
        }
        
        for (let alpha = ~~(this.height * 1.25); alpha >= 0; alpha -= this.gap) {
          const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
          points.push(this.createPoint(
            Math.sin(angle) * this.height / 2 + this.margin + this.width - this.height / 2,
            Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
          ));
        }
        
        for (let x = this.width - ~~(this.height / 2) - 1; x >= ~~(this.height / 2); x -= this.gap) {
          points.push(this.createPoint(
            x + this.margin,
            this.margin + this.height
          ));
        }
        
        for (let alpha = 0; alpha <= ~~(this.height * 1.25); alpha += this.gap) {
          const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
          points.push(this.createPoint(
            (this.height - Math.sin(angle) * this.height / 2) + this.margin - this.height / 2,
            Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
          ));
        }
        
        layer.points = points;
      }
    }
  
    addStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .liquid-button {
          position: relative;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        .liquid-button:focus {
          box-shadow: 0 0 0 3px ${this.focusOutlineColor};
          border-radius: 4px;
        }
        
        .liquid-button-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: ${this.textColor};
          font-family: sans-serif;
          font-size: ${this.height / 3}px;
          font-weight: 600;
          pointer-events: none;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .liquid-button-text {
            text-shadow: none;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Usage example:
  new AccessibleLiquidButton({
    text: 'Hover Me',
    ariaLabel: 'Interactive button with liquid effect',
    width: 250,
    height: 100,
    onClick: () => console.log('Button clicked!'),
    wrapperElement: document.getElementById('button-container')
  });
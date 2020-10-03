from pyowm import OWM

API_key = 'abc2e048c58bc8264971b19a17e2a1d5'
owm = OWM(API_key)
mgr = owm.weather_manager()
obs = mgr.weather_at_place('London,GB')      
w = obs.weather
print(w)
res = w.status 
print(res) # Rain
res1 = w.detailed_status
print(res1) # moderate/light rain

w2 = obs.weather.wind()
print(w2)            # {'speed': 4.39, 'deg': 42}


# from pyowm.owm import OWM
# owm = OWM('API_key')
# mgr = owm.weather_manager()
# forecaster = mgr.forecast_at_place('Berlin,DE', '3h') # this gives you a
# ˓→Forecaster object
# print(forecaster.when_starts('iso')) # 2020-03-10 14:00:00+00:00'
# forecaster.get_wind()
# forecaster.when_ends('iso') 
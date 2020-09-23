import time,importlib

def checkModule(moduleName) :
    rltDict = dict()
    isSuccess = True
    try :
        mod = importlib.import_module(moduleName)
        rltDict["success"] = isSuccess
        rltDict["version"] = mod.__version__
        rltDict["module"] = moduleName
    except :
        isSuccess = False
    finally :
        rltDict["success"] = isSuccess
        rltDict["module"] = moduleName
        return rltDict


if __name__ == "__main__" :
    moduleList  = ["torch","torchvision","torchtext","numpy","matplotlib","sklearn"]
    rltDictList = list()
    isReady     = True
    
    for each in moduleList :
        eachDict = checkModule(each)
        rltDictList.append(eachDict)
        if not eachDict["success"] : isReady = False

    if isReady :
        print("=== 모든 라이브러리 설치 완료 ! ===")
        time.sleep(0.5)
        print("=== 설치된 라이브러리 정보 ===")
        for each in rltDictList :
            print(each["module"],"version :",each["version"])
    else :
        print("=== 설치가 안된 라이브러리가 있어요 ===")
        time.sleep(0.5)
        print("=== 미설치된 라이브러리 정보 ===")
        for each in rltDictList :
            if not each["success"] :
                print(each["module"])


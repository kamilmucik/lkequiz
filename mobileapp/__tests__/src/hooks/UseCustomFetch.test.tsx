
import { renderHook } from '@testing-library/react-hooks'
import { useCustomFetch } from '../../../src/hooks/useCustomFetch'

//https://react-hooks-testing-library.com/usage/advanced-hooks
describe("useCustomFetch", () => {
    let query = 'department/1/1/10/';

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return default value of hook', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useCustomFetch(query))
        const { loading, moreLoading, error, moreError, data, totalPage, currentPage, isListEnd } = result.current;
        
        console.log("result: " + JSON.stringify(result.current));
        // result.current.incrementAsync()
      
        await waitForNextUpdate()
      
        expect(result.current.totalPage).toBe(1)
        // expect(data).toBe([]);
        expect(error).toBe(null);
        expect(moreError).toBe(null);
        expect(loading).toBe(false);
        // expect(moreLoading).toBe(false);
        expect(totalPage).toBe(1);
        expect(currentPage).toBe(1);
        expect(isListEnd).toBe(false);
      })

      test('should return default correct resopnse', async () => {
          
          let mockedData = {
              loading: false, 
              moreLoading: false, 
              totalPage: 1,
              currentPage: 1,
              data: [
                {"id": 6, "name": "PPL(A) skrócony"}, 
                {"id": 1, "name": "PPL(A)"}, 
                {"id": 5, "name": "SPL"}
              ]
            };
          global.fetch.mockResolvedValue({
              json: jest.fn().mockResolvedValue(mockedData),
          });
  
          const { result, waitForNextUpdate } = renderHook(() => useCustomFetch(query))
          const { loading, moreLoading, error, moreError, data, totalPage, currentPage, isListEnd } = result.current;
          
          console.log("result: " + JSON.stringify(result.current));
          // result.current.incrementAsync()
        
          await waitForNextUpdate()
        
          expect(result.current.totalPage).toBe(1)
          expect(data).toBe(mockedData.data);
          expect(error).toBe(null);
          expect(moreError).toBe(null);
          expect(loading).toBe(false);
          expect(moreLoading).toBe(false);
          expect(totalPage).toBe(1);
          expect(currentPage).toBe(1);
          expect(isListEnd).toBe(false);
        })


    // let mockedData;

    // beforeEach(() => {
    //   mockedData = [
    //     {
    //       body: "mocked body",
    //       id: 1,
    //       title: "mock title",
    //       userId: 1,
    //     },
    //   ];
  
    //   global.fetch.mockResolvedValue({
    //     json: jest.fn().mockResolvedValue(mockedData),
    //   });
    // });

    // it('returns isLoading true while the component is loading', async () => {
    //     const { result } = renderHook(() =>
    //             usePermissionsHook('23')
    //         );
    //         // console.log("debug detail in some test"+ JSON.stringify(result))
    //         // console.log("cache: " + JSON.stringify(result));
    //     // expect(result.current.isLoading).toEqual(true);
    //     // expect(result.current.permissions).toEqual([]);
    // });
    
    // it('should trigger a reset of the counter to 0, when the counter reaches 10', async () => {
    //     const hook = renderHook(() => useCounter());
      
    //     await act(() => {
    //       hook.result.current.setCounter(10);
    //     });
      
    //     await waitFor(() => expect(hook.result.current.counter).toEqual(0));
    //   });

    // it('test count update', () => {
    //     const { result } = renderHook(() => useState({ count: 0 }));
    //     const [state, setState] = result.current;
    //     // setState({count: state + 1});
    //     // expect(state).toBe({count: 0});
    // })

    // it("should return data", async () => {
    //     const { result } = renderHook(() => useCustomFetch());
    //     // const {result} = renderHook(() => myHook())

        
    
    //     await waitFor(() =>{
    //         console.log("cache: " + JSON.stringify(result));
    //     }
        
    //     //   expect(result.current).toEqual({
    //     //     data: mockedData,
    //     //     error: null,
    //     //     loading: false,
    //     //   })
    //     );
    //   });

//   it("should return the initial values for data, error and loading", async () => {
//     const { result } = renderHook(() => useFetchedData());
//     const { data, error, loading } = result.current;

//     expect(data).toBe(null);
//     expect(error).toBe(null);
//     expect(loading).toBe(true);
//   });
});